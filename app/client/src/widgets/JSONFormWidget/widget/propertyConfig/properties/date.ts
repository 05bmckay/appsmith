import moment from "moment";

import { ValidationTypes } from "constants/WidgetValidation";
import { FieldType } from "widgets/JSONFormWidget/constants";
import { HiddenFnParams, getSchemaItem } from "../helper";

const PROPERTIES = {
  general: [
    {
      propertyName: "defaultValue",
      label: "Default Date",
      helpText:
        "Sets the default date of the widget. The date is updated if the default date changes",
      controlType: "DATE_PICKER",
      placeholderText: "Enter Default Date",
      useValidationMessage: true,
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      validation: { type: ValidationTypes.DATE_ISO_STRING },
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
    {
      helpText: "Sets the format of the selected date",
      propertyName: "dateFormat",
      label: "Date Format",
      controlType: "DROP_DOWN",
      isJSConvertible: true,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      optionWidth: "340px",
      options: [
        {
          label: moment().format("YYYY-MM-DDTHH:mm:ss.sssZ"),
          subText: "ISO 8601",
          value: "YYYY-MM-DDTHH:mm:ss.sssZ",
        },
        {
          label: moment().format("LLL"),
          subText: "LLL",
          value: "LLL",
        },
        {
          label: moment().format("LL"),
          subText: "LL",
          value: "LL",
        },
        {
          label: moment().format("YYYY-MM-DD HH:mm"),
          subText: "YYYY-MM-DD HH:mm",
          value: "YYYY-MM-DD HH:mm",
        },
        {
          label: moment().format("YYYY-MM-DDTHH:mm:ss"),
          subText: "YYYY-MM-DDTHH:mm:ss",
          value: "YYYY-MM-DDTHH:mm:ss",
        },
        {
          label: moment().format("YYYY-MM-DD hh:mm:ss A"),
          subText: "YYYY-MM-DD hh:mm:ss A",
          value: "YYYY-MM-DD hh:mm:ss A",
        },
        {
          label: moment().format("DD/MM/YYYY HH:mm"),
          subText: "DD/MM/YYYY HH:mm",
          value: "DD/MM/YYYY HH:mm",
        },
        {
          label: moment().format("D MMMM, YYYY"),
          subText: "D MMMM, YYYY",
          value: "D MMMM, YYYY",
        },
        {
          label: moment().format("H:mm A D MMMM, YYYY"),
          subText: "H:mm A D MMMM, YYYY",
          value: "H:mm A D MMMM, YYYY",
        },
        {
          label: moment().format("YYYY-MM-DD"),
          subText: "YYYY-MM-DD",
          value: "YYYY-MM-DD",
        },
        {
          label: moment().format("MM-DD-YYYY"),
          subText: "MM-DD-YYYY",
          value: "MM-DD-YYYY",
        },
        {
          label: moment().format("DD-MM-YYYY"),
          subText: "DD-MM-YYYY",
          value: "DD-MM-YYYY",
        },
        {
          label: moment().format("MM/DD/YYYY"),
          subText: "MM/DD/YYYY",
          value: "MM/DD/YYYY",
        },
        {
          label: moment().format("DD/MM/YYYY"),
          subText: "DD/MM/YYYY",
          value: "DD/MM/YYYY",
        },
        {
          label: moment().format("DD/MM/YY"),
          subText: "DD/MM/YY",
          value: "DD/MM/YY",
        },
        {
          label: moment().format("MM/DD/YY"),
          subText: "MM/DD/YY",
          value: "MM/DD/YY",
        },
      ],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.TEXT },
      hideSubText: true,
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
    {
      propertyName: "closeOnSelection",
      label: "Close On Selection",
      helpText: "Calender should close when a date is selected",
      controlType: "SWITCH",
      isJSConvertible: false,
      isBindProperty: true,
      isTriggerProperty: false,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      validation: { type: ValidationTypes.BOOLEAN },
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
    {
      propertyName: "shortcuts",
      label: "Show Shortcuts",
      helpText: "Choose to show shortcut menu",
      controlType: "SWITCH",
      isJSConvertible: false,
      isBindProperty: true,
      isTriggerProperty: false,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      validation: { type: ValidationTypes.BOOLEAN },
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
    {
      propertyName: "minDate",
      label: "Min Date",
      helpText: "Defines the min date for this widget",
      controlType: "DATE_PICKER",
      useValidationMessage: true,
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      validation: { type: ValidationTypes.DATE_ISO_STRING },
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
    {
      propertyName: "maxDate",
      label: "Max Date",
      helpText: "Defines the max date for this widget",
      controlType: "DATE_PICKER",
      useValidationMessage: true,
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      validation: { type: ValidationTypes.DATE_ISO_STRING },
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
  ],
  actions: [
    {
      propertyName: "onDateSelected",
      label: "onDateSelected",
      controlType: "ACTION_SELECTOR",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
      customJSControl: "JSON_FORM_COMPUTE_VALUE",
      hidden: (...args: HiddenFnParams) =>
        getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATE),
      dependencies: ["schema", "sourceData"],
    },
  ],
};

export default PROPERTIES;
