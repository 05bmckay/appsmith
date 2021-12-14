import { getAllPathsFromPropertyConfig } from "./utils";
import { RenderModes } from "constants/WidgetConstants";
import tablePropertyPaneConfig from "widgets/TableWidget/widget/propertyConfig";
import chartPorpertyConfig from "widgets/ChartWidget/widget/propertyConfig";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/TernServer";

describe("getAllPathsFromPropertyConfig", () => {
  it("works as expected for table widget", () => {
    const widget = {
      renderMode: RenderModes.CANVAS,
      derivedColumns: [],
      widgetName: "Table1",
      rightColumn: 8,
      textSize: "PARAGRAPH",
      columnOrder: ["name", "createdAt", "status"],
      dynamicPropertyPathList: [
        {
          key: "primaryColumns.name.verticalAlignment",
        },
      ],
      widgetId: "19ye491zn1",
      topRow: 7,
      bottomRow: 14,
      parentRowSpace: 40,
      tableData: "{{getUsers.data}}",
      isVisible: true,
      isVisibleDownload: true,
      label: "Data",
      searchKey: "",
      type: "TABLE_WIDGET",
      parentId: "0",
      isLoading: false,
      isSortable: true,
      horizontalAlignment: "LEFT",
      parentColumnSpace: 74,
      version: 1,
      dynamicTriggerPathList: [
        {
          key: "primaryColumns.status.onClick",
        },
      ],
      leftColumn: 0,
      dynamicBindingPathList: [
        {
          key: "primaryColumns.name.computedValue",
        },
        {
          key: "primaryColumns.createdAt.computedValue",
        },
        {
          key: "primaryColumns.status.buttonLabel",
        },
        {
          key: "tableData",
        },
      ],
      primaryColumns: {
        name: {
          index: 1,
          width: 150,
          id: "name",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "text",
          textSize: "PARAGRAPH",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "name",
          computedValue:
            "{{Table1.tableData.map((currentRow) => (currentRow.name))}}",
        },
        createdAt: {
          index: 2,
          width: 150,
          id: "createdAt",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "date",
          textSize: "PARAGRAPH",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDerived: false,
          label: "createdAt",
          computedValue:
            "{{Table1.tableData.map((currentRow) => (currentRow.createdAt))}}",
          inputFormat: "YYYY-MM-DDTHH:mm:ss",
          outputFormat: "DD-MM-YYYY",
        },
        status: {
          index: 4,
          width: 150,
          id: "status",
          horizontalAlignment: "LEFT",
          verticalAlignment: "CENTER",
          columnType: "button",
          textSize: "PARAGRAPH",
          enableFilter: true,
          enableSort: true,
          isVisible: true,
          isDisabled: false,
          isDerived: false,
          label: "status",
          computedValue:
            "{{Table1.tableData.map((currentRow) => (currentRow.status))}}",
          buttonLabel:
            "{{Table1.tableData.map((currentRow) => (currentRow.status))}}",
          onClick: "{{showAlert(currentRow.status)}}",
        },
      },
      verticalAlignment: "CENTER",
    };
    const config = tablePropertyPaneConfig;

    const expected = {
      bindingPaths: {
        selectedRow: EvaluationSubstitutionType.TEMPLATE,
        selectedRows: EvaluationSubstitutionType.TEMPLATE,
        tableData: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        defaultSearchText: EvaluationSubstitutionType.TEMPLATE,
        defaultSelectedRow: EvaluationSubstitutionType.TEMPLATE,
        isVisible: EvaluationSubstitutionType.TEMPLATE,
        isSortable: EvaluationSubstitutionType.TEMPLATE,
        cellBackground: EvaluationSubstitutionType.TEMPLATE,
        textColor: EvaluationSubstitutionType.TEMPLATE,
        textSize: EvaluationSubstitutionType.TEMPLATE,
        animateLoading: EvaluationSubstitutionType.TEMPLATE,
        primaryColumnId: EvaluationSubstitutionType.TEMPLATE,
        compactMode: EvaluationSubstitutionType.TEMPLATE,
        delimiter: EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.computedValue":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.horizontalAlignment":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.verticalAlignment":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.textSize": EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.fontStyle": EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.textColor": EvaluationSubstitutionType.TEMPLATE,
        // "primaryColumns.name.isVisible": EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.name.isCellVisible":
          EvaluationSubstitutionType.TEMPLATE,

        "primaryColumns.name.cellBackground":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.inputFormat":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.outputFormat":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.computedValue":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.isCellVisible":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.horizontalAlignment":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.verticalAlignment":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.textSize":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.fontStyle":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.textColor":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.createdAt.cellBackground":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.status.buttonLabel":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.status.buttonColor":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.status.isDisabled": EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.status.buttonLabelColor":
          EvaluationSubstitutionType.TEMPLATE,
        "primaryColumns.status.isCellVisible":
          EvaluationSubstitutionType.TEMPLATE,
      },
      triggerPaths: {
        onRowSelected: true,
        onPageChange: true,
        onSearchTextChanged: true,
        onSort: true,
        onPageSizeChange: true,
        "primaryColumns.status.onClick": true,
      },
      validationPaths: {
        cellBackground: {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        animateLoading: {
          type: "BOOLEAN",
        },
        defaultSearchText: {
          type: "TEXT",
        },
        delimiter: {
          type: "TEXT",
        },
        defaultSelectedRow: {
          params: {
            expected: {
              autocompleteDataType: AutocompleteDataType.STRING,
              example: "0 | [0, 1]",
              type: "Index of row(s)",
            },
          },
          type: "FUNCTION",
        },
        "primaryColumns.createdAt.cellBackground": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.createdAt.fontStyle": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["BOLD", "ITALIC", "UNDERLINE"],
            },
            type: "TEXT",
          },
        },
        "primaryColumns.createdAt.horizontalAlignment": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["LEFT", "CENTER", "RIGHT"],
              default: "LEFT",
            },
            type: "TEXT",
          },
        },
        "primaryColumns.createdAt.isCellVisible": {
          type: "TABLE_PROPERTY",
          params: {
            type: "BOOLEAN",
          },
        },
        "primaryColumns.createdAt.textColor": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.createdAt.textSize": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: [
                "HEADING1",
                "HEADING2",
                "HEADING3",
                "PARAGRAPH",
                "PARAGRAPH2",
              ],
              default: "PARAGRAPH",
            },
            type: "TEXT",
          },
        },
        isVisible: {
          type: "BOOLEAN",
        },
        isSortable: {
          type: "BOOLEAN",
          params: {
            default: true,
          },
        },
        "primaryColumns.createdAt.verticalAlignment": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["TOP", "CENTER", "BOTTOM"],
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.cellBackground": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.fontStyle": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["BOLD", "ITALIC", "UNDERLINE"],
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.horizontalAlignment": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["LEFT", "CENTER", "RIGHT"],
              default: "LEFT",
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.isCellVisible": {
          type: "TABLE_PROPERTY",
          params: {
            type: "BOOLEAN",
          },
        },
        "primaryColumns.name.textColor": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.textSize": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: [
                "HEADING1",
                "HEADING2",
                "HEADING3",
                "PARAGRAPH",
                "PARAGRAPH2",
              ],
              default: "PARAGRAPH",
            },
            type: "TEXT",
          },
        },
        "primaryColumns.name.verticalAlignment": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: ["TOP", "CENTER", "BOTTOM"],
            },
            type: "TEXT",
          },
        },
        "primaryColumns.status.buttonColor": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.status.buttonLabelColor": {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        "primaryColumns.status.isCellVisible": {
          type: "TABLE_PROPERTY",
          params: {
            type: "BOOLEAN",
          },
        },
        "primaryColumns.status.isDisabled": {
          type: "TABLE_PROPERTY",
          params: {
            type: "BOOLEAN",
          },
        },
        primaryColumnId: {
          type: "TEXT",
        },
        tableData: {
          type: "OBJECT_ARRAY",
          params: {
            default: [],
          },
        },
        textColor: {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              regex: /^(?![<|{{]).+/,
            },
            type: "TEXT",
          },
        },
        textSize: {
          type: "TABLE_PROPERTY",
          params: {
            params: {
              allowedValues: [
                "HEADING1",
                "HEADING2",
                "HEADING3",
                "PARAGRAPH",
                "PARAGRAPH2",
              ],
              default: "PARAGRAPH",
            },
            type: "TEXT",
          },
        },
      },
    };

    const result = getAllPathsFromPropertyConfig(widget, config, {
      selectedRow: true,
      selectedRows: true,
      tableData: true,
    });

    // Note: Removing until we figure out how functions are represented here.
    delete result.validationPaths.defaultSelectedRow.params?.fn;

    expect(result).toStrictEqual(expected);
  });
  it("works as expected for chart widget", () => {
    const widget = {
      renderMode: RenderModes.CANVAS,
      isVisible: true,
      widgetName: "Chart1",
      chartType: "LINE_CHART",
      chartName: "Sales on working days",
      allowScroll: false,
      version: 1,
      chartData: {
        "random-id": {
          seriesName: "",
          data: "{{Api1.data}}",
        },
      },
      xAxisName: "Last Week",
      yAxisName: "Total Order Revenue $",
      type: "CHART_WIDGET",
      isLoading: false,
      parentColumnSpace: 74,
      parentRowSpace: 40,
      leftColumn: 4,
      rightColumn: 10,
      topRow: 6,
      bottomRow: 14,
      parentId: "0",
      widgetId: "x1naz9is2b",
      dynamicBindingPathList: [
        {
          key: "chartData.random-id.data",
        },
      ],
      setAdaptiveYMin: "0",
    };
    const config = chartPorpertyConfig;

    const expected = {
      bindingPaths: {
        chartType: EvaluationSubstitutionType.TEMPLATE,
        chartName: EvaluationSubstitutionType.TEMPLATE,
        "chartData.random-id.seriesName": EvaluationSubstitutionType.TEMPLATE,
        "chartData.random-id.data": EvaluationSubstitutionType.SMART_SUBSTITUTE,
        xAxisName: EvaluationSubstitutionType.TEMPLATE,
        yAxisName: EvaluationSubstitutionType.TEMPLATE,
        isVisible: EvaluationSubstitutionType.TEMPLATE,
        animateLoading: EvaluationSubstitutionType.TEMPLATE,
        setAdaptiveYMin: EvaluationSubstitutionType.TEMPLATE,
      },
      triggerPaths: {
        onDataPointClick: true,
      },
      validationPaths: {
        "chartData.random-id.data": {
          params: {
            children: {
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "x",
                    type: "TEXT",
                    params: {
                      default: "",
                      required: true,
                    },
                  },
                  {
                    name: "y",
                    type: "NUMBER",
                    params: {
                      default: 10,
                      required: true,
                    },
                  },
                ],
              },
              type: "OBJECT",
            },
          },
          type: "ARRAY",
        },
        "chartData.random-id.seriesName": {
          type: "TEXT",
        },
        chartName: {
          type: "TEXT",
        },
        chartType: {
          params: {
            allowedValues: [
              "LINE_CHART",
              "BAR_CHART",
              "PIE_CHART",
              "COLUMN_CHART",
              "AREA_CHART",
              "CUSTOM_FUSION_CHART",
            ],
          },
          type: "TEXT",
        },
        isVisible: {
          type: "BOOLEAN",
        },
        animateLoading: {
          type: "BOOLEAN",
        },
        setAdaptiveYMin: {
          type: "BOOLEAN",
        },
        xAxisName: {
          type: "TEXT",
        },
        yAxisName: {
          type: "TEXT",
        },
      },
    };

    const result = getAllPathsFromPropertyConfig(widget, config, {
      "chartData.random-id.data": true,
    });

    expect(result).toStrictEqual(expected);
  });
});
