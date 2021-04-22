import React from "react";
import { get, some, isEqual } from "lodash";
import { WidgetProps } from "../../BaseWidget";
import { WidgetType } from "constants/WidgetConstants";
import ContainerWidget, {
  ContainerWidgetProps,
} from "widgets/ContainerWidget/widget";
import { ContainerComponentProps } from "widgets/ContainerWidget/component";
import produce from "immer";

class FormWidget extends ContainerWidget {
  static getPropertyPaneConfig() {
    return [
      {
        sectionName: "General",
        children: [
          {
            propertyName: "backgroundColor",
            label: "Background Color",
            helpText: "Use a html color name, HEX, RGB or RGBA value",
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
          },
          {
            helpText: "Controls the visibility of the widget",
            propertyName: "isVisible",
            label: "Visible",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
          },
          {
            propertyName: "shouldScrollContents",
            label: "Scroll Contents",
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
        ],
      },
    ];
  }
  checkInvalidChildren = (children: WidgetProps[]): boolean => {
    return some(children, (child) => {
      if ("children" in child) {
        return this.checkInvalidChildren(child.children);
      }
      if ("isValid" in child) {
        return !child.isValid;
      }
      return false;
    });
  };

  handleResetInputs = () => {
    this.props.resetChildrenMetaProperty(this.props.widgetId);
  };

  componentDidMount() {
    this.updateFormData();
  }

  componentDidUpdate() {
    this.updateFormData();
  }

  updateFormData() {
    const firstChild = get(this.props, "children[0]");
    if (firstChild) {
      const formData = this.getFormData(firstChild);
      if (!isEqual(formData, this.props.data)) {
        this.props.updateWidgetMetaProperty("data", formData);
      }
    }
  }

  getFormData(formWidget: ContainerWidgetProps<WidgetProps>) {
    const formData: any = {};
    if (formWidget.children)
      formWidget.children.forEach((widgetData) => {
        if (widgetData.value) {
          formData[widgetData.widgetName] = widgetData.value;
        }
      });
    return formData;
  }

  renderChildWidget(childWidgetData: WidgetProps): React.ReactNode {
    console.log("Form Widget", { childWidgetData });
    if (childWidgetData.children) {
      const isInvalid = this.checkInvalidChildren(childWidgetData.children);
      childWidgetData = produce(childWidgetData, (draft: WidgetProps) => {
        draft.children.forEach((grandChild: WidgetProps, index: number) => {
          if (isInvalid) draft[index].isFormInvalid = false;
          draft.children[index].onReset = this.handleResetInputs;
        });
      });
    }
    return super.renderChildWidget(childWidgetData);
  }

  static getWidgetType(): WidgetType {
    return "FORM_WIDGET";
  }
}

export interface FormWidgetProps extends ContainerComponentProps {
  name: string;
  data: Record<string, unknown>;
}

export default FormWidget;
