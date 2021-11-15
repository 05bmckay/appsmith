import { cloneDeep, difference, isEmpty, maxBy, omit, startCase } from "lodash";
import {
  ARRAY_ITEM_KEY,
  DATA_TYPE_POTENTIAL_FIELD,
  DataType,
  FIELD_MAP,
  FIELD_TYPE_TO_POTENTIAL_DATA,
  FieldType,
  ROOT_SCHEMA_KEY,
  Schema,
  SchemaItem,
  getBindingTemplate,
} from "./constants";

type Obj = Record<string, any>;
type JSON = Obj | Obj[];

type ParserOptions = {
  currSourceData?: JSON | string;
  fieldType?: FieldType;
  isCustomField?: boolean;
  prevSchema?: Schema;
  sourceDataPath?: string;
  widgetName: string;
};

type SchemaItemsByFieldOptions = {
  schemaItem: SchemaItem;
  schemaItemPath: string;
  schema: Schema;
  widgetName: string;
};

/**
 *
 * This method takes in array of object and squishes every object in the
 * array into single object thus making sure that all the keys are
 * in single object.
 *
 * @example
 *  Input - [{ firstName: "John", age: 20 }, { lastName: "Doe", age: 30 }]
 *  Output - { firstName: "John", age: 20, lastName: "Doe" }
 */

// TODO: Improve logic to look into all the array items to get the proper object
export const constructPlausibleObjectFromArray = (arrayOfObj: Obj[]) => {
  let plausibleObj = {};

  arrayOfObj.forEach((obj) => {
    plausibleObj = {
      ...plausibleObj,
      ...obj,
    };
  });

  return plausibleObj;
};

const getSourcePath = (name: string | number, basePath?: string) => {
  if (typeof name === "string") {
    return basePath ? `${basePath}.${name}` : name;
  }

  const indexedName = `[${name}]`;

  return basePath ? `${basePath}${indexedName}` : indexedName;
};

const convertSchemaItemPathToSourceDataPath = (
  schema: Schema,
  schemaItemPath: string,
) => {
  const keys = schemaItemPath.split(".");
  let clonedSchema = cloneDeep(schema);
  let sourceDataPath = "sourceData";
  let schemaItem: SchemaItem;
  let skipIteration = false;

  keys.forEach((key, index) => {
    if (index !== 0 && !skipIteration) {
      schemaItem = clonedSchema[key];

      if (schemaItem.dataType === DataType.OBJECT) {
        sourceDataPath = sourceDataPath.concat(".");
      } else if (schemaItem.dataType === DataType.ARRAY) {
        sourceDataPath = sourceDataPath.concat("[0]");
      } else {
        sourceDataPath = sourceDataPath.concat(schemaItem.name);
      }

      if (!isEmpty(schemaItem.children)) {
        clonedSchema = schemaItem.children;
        skipIteration = true;
      }
    } else if (skipIteration) {
      skipIteration = false;
    }
  });

  return sourceDataPath;
};

export const dataTypeFor = (value: any) => {
  const typeOfValue = typeof value;

  if (Array.isArray(value)) return DataType.ARRAY;
  if (value === null) return DataType.NULL;

  return typeOfValue as DataType;
};

export const subDataTypeFor = (value: any) => {
  const dataType = dataTypeFor(value);

  if (dataType === DataType.ARRAY) {
    return dataTypeFor(value[0]);
  }

  return undefined;
};

export const normalizeArrayValue = (data: Obj[]) => {
  if (subDataTypeFor(data) === DataType.OBJECT) {
    return constructPlausibleObjectFromArray(data);
  }

  return data[0];
};

export const fieldTypeFor = (value: any) => {
  const dataType = dataTypeFor(value);
  const fieldType = DATA_TYPE_POTENTIAL_FIELD[dataType];
  const subDataType = subDataTypeFor(value);

  if (subDataType) {
    switch (subDataType) {
      case DataType.STRING:
      case DataType.NUMBER:
        return FieldType.MULTI_SELECT;
      default:
        return FieldType.ARRAY;
    }
  }

  return fieldType;
};

const getKeysFromSchema = (schema: Schema) => {
  return Object.entries(schema).reduce<string[]>((keys, [key, schemaItem]) => {
    if (!schemaItem.isCustomField) {
      keys.push(key);
    }

    return keys;
  }, []);
};

const applyPositions = (schema: Schema, newKeys?: string[]) => {
  if (!newKeys) {
    return;
  }
  const schemaItems = Object.values(schema);
  const lastSchemaItem = maxBy(schemaItems, ({ position }) => position);
  const lastSchemaItemPosition = lastSchemaItem?.position || -1;

  newKeys.forEach((newKey, index) => {
    schema[newKey].position = lastSchemaItemPosition + index + 1;
  });
};

class SchemaParser {
  static nameAndLabel = (key: string) => {
    return {
      name: key,
      label: startCase(key),
    };
  };

  static parse = (
    widgetName: string,
    currSourceData?: JSON,
    schema: Schema = {},
  ) => {
    if (!currSourceData) return schema;

    const prevSchema = (() => {
      const rootSchemaItem = schema[ROOT_SCHEMA_KEY];
      if (rootSchemaItem) return rootSchemaItem.children;

      return {};
    })();

    const rootSchemaItem = SchemaParser.getSchemaItemFor("", {
      currSourceData,
      prevSchema,
      sourceDataPath: "",
      widgetName,
    });

    return {
      [ROOT_SCHEMA_KEY]: rootSchemaItem,
    };
  };

  static getSchemaItemByFieldType = (
    key: string,
    fieldType: FieldType,
    options: SchemaItemsByFieldOptions,
  ) => {
    const { schema, schemaItem, schemaItemPath, widgetName } = options;
    const currSourceData = schemaItem.isCustomField
      ? FIELD_TYPE_TO_POTENTIAL_DATA[fieldType]
      : schemaItem.sourceData;

    return SchemaParser.getSchemaItemFor(key, {
      isCustomField: schemaItem.isCustomField,
      currSourceData,
      fieldType,
      widgetName,
      sourceDataPath: convertSchemaItemPathToSourceDataPath(
        schema,
        schemaItemPath,
      ),
    });
  };

  static getSchemaItemFor = (
    key: string,
    options: ParserOptions,
  ): SchemaItem => {
    const {
      currSourceData,
      isCustomField = false,
      sourceDataPath,
      widgetName,
    } = options || {};
    const dataType = dataTypeFor(currSourceData);
    const fieldType = options.fieldType || fieldTypeFor(currSourceData);
    const FieldComponent = FIELD_MAP[fieldType];
    const { label, name } = SchemaParser.nameAndLabel(key);
    const { endTemplate, startTemplate } = getBindingTemplate(widgetName);

    const defaultValue = (() => {
      if (isCustomField) return;

      const path = sourceDataPath
        ? `${startTemplate}sourceData.${sourceDataPath}${endTemplate}`
        : undefined;

      return `${path}`;
    })();

    // Removing fieldType (which might have been passed by getSchemaItemByFieldType)
    // as it might bleed into subsequent schema item and force assign fieldType
    const sanitizedOptions = omit(options, ["fieldType"]);

    let children: Schema = {};
    if (dataType === DataType.OBJECT) {
      children = SchemaParser.convertObjectToSchema(sanitizedOptions);
    }

    if (dataType === DataType.ARRAY) {
      children = SchemaParser.convertArrayToSchema(sanitizedOptions);
    }

    return {
      ...FieldComponent.componentDefaultValues,
      children,
      dataType,
      defaultValue,
      fieldType,
      sourceData: currSourceData,
      isCustomField,
      label,
      name,
      position: -1,
    };
  };

  static getModifiedSchemaItemFor = (
    currData: JSON,
    schemaItem: SchemaItem,
    sourceDataPath: string,
    widgetName: string,
  ) => {
    let { children } = schemaItem;
    const { dataType } = schemaItem;

    const options = {
      currSourceData: currData,
      prevSchema: children,
      sourceDataPath,
      widgetName,
    };

    if (dataType === DataType.OBJECT) {
      children = SchemaParser.convertObjectToSchema(options);
    }

    if (dataType === DataType.ARRAY) {
      children = SchemaParser.convertArrayToSchema(options);
    }

    return {
      ...schemaItem,
      children,
    };
  };

  static convertArrayToSchema = ({
    currSourceData = [],
    prevSchema = {},
    sourceDataPath,
    widgetName,
    ...rest
  }: ParserOptions): Schema => {
    const schema = cloneDeep(prevSchema);
    const currData = normalizeArrayValue(currSourceData as any[]);

    const prevDataType = schema[ARRAY_ITEM_KEY]?.dataType;
    const currDataType = dataTypeFor(currData);

    if (currDataType !== prevDataType) {
      schema[ARRAY_ITEM_KEY] = SchemaParser.getSchemaItemFor(ARRAY_ITEM_KEY, {
        ...rest,
        widgetName,
        currSourceData: currData,
        sourceDataPath: getSourcePath(0, sourceDataPath),
      });
    } else {
      schema[ARRAY_ITEM_KEY] = SchemaParser.getModifiedSchemaItemFor(
        currData,
        schema[ARRAY_ITEM_KEY],
        getSourcePath(0, sourceDataPath),
        widgetName,
      );
    }

    return schema;
  };

  static convertObjectToSchema = ({
    currSourceData = {},
    prevSchema = {},
    sourceDataPath,
    widgetName,
  }: ParserOptions): Schema => {
    const schema = cloneDeep(prevSchema);
    const currObj = currSourceData as Obj;

    const currKeys = Object.keys(currSourceData);
    const prevKeys = getKeysFromSchema(prevSchema);

    const newKeys = difference(currKeys, prevKeys);
    const removedKeys = difference(prevKeys, currKeys);
    const modifiedKeys = difference(currKeys, newKeys.concat(removedKeys));

    modifiedKeys.forEach((modifiedKey) => {
      const currDataType = dataTypeFor(currObj[modifiedKey]);
      const prevDataType = schema[modifiedKey].dataType;

      if (currDataType !== prevDataType) {
        schema[modifiedKey] = SchemaParser.getSchemaItemFor(modifiedKey, {
          currSourceData: currObj[modifiedKey],
          prevSchema: schema[modifiedKey].children,
          sourceDataPath: getSourcePath(modifiedKey, sourceDataPath),
          widgetName,
        });
      } else {
        schema[modifiedKey] = SchemaParser.getModifiedSchemaItemFor(
          currObj[modifiedKey],
          schema[modifiedKey],
          getSourcePath(modifiedKey, sourceDataPath),
          widgetName,
        );
      }
    });

    removedKeys.forEach((removedKey) => {
      delete schema[removedKey];
    });

    newKeys.forEach((newKey) => {
      schema[newKey] = SchemaParser.getSchemaItemFor(newKey, {
        currSourceData: currObj[newKey],
        sourceDataPath: getSourcePath(newKey, sourceDataPath),
        widgetName,
      });
    });

    if (newKeys.length) {
      applyPositions(schema, newKeys);
    }

    return schema;
  };
}

export default SchemaParser;
