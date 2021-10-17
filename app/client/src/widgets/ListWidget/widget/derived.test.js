import derivedProperty from "./derived";

describe("Validates Derived Properties", () => {
  it("validates selectedItem property", () => {
    const { getSelectedItem } = derivedProperty;
    const input = {
      listData: [{ id: 1 }, { id: 2 }],
      selectedItemIndex: 1,
    };

    const expected = { id: 2 };

    let result = getSelectedItem(input);
    expect(result).toStrictEqual(expected);
  });

  it("validates items property", () => {
    const { getItems } = derivedProperty;
    const input = {
      listData: [1, 2],
      childrenEntityDefinitions: {
        TEXT_WIDGET: ["text"],
      },
      template: {
        Input1: {
          widgetName: "Input1",
          widgetId: "some-random-id",
          text: [1, 2],
          type: "TEXT_WIDGET",
          dynamicBindingPathList: [{ key: "text" }],
        },
      },
    };

    const expected = [
      {
        Input1: {
          text: 1,
        },
      },
      {
        Input1: {
          text: 2,
        },
      },
    ];

    let result = getItems(input);
    expect(result).toStrictEqual(expected);
  });

  it("validates pageSize property", () => {
    const { getPageSize } = derivedProperty;
    const input1 = {
      bottomRow: 86,
      children: [{ children: [{ bottomRow: 16 }] }],
      templateBottomRow: 16,
      gridGap: 0,
      parentRowSpace: 10,
      topRow: 9,
    };
    // resize ListWidget so bottomRow changes
    const input2 = {
      ...input1,
      bottomRow: 56,
    };

    const expected1 = 4;
    const expected2 = 2;

    let result1 = getPageSize(input1);
    let result2 = getPageSize(input2);

    expect(result1).toStrictEqual(expected1);
    expect(result2).toStrictEqual(expected2);
  });
});
