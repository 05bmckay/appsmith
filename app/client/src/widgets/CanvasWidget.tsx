import React, { CSSProperties } from "react";
import { WidgetProps } from "widgets/BaseWidget";
import ContainerWidget, {
  ContainerWidgetProps,
} from "widgets/ContainerWidget/widget";
import { GridDefaults, RenderModes } from "constants/WidgetConstants";
import DropTargetComponent from "components/editorComponents/DropTargetComponent";
import { getCanvasSnapRows } from "utils/WidgetPropsUtils";
import { getCanvasClassName } from "utils/generators";
import {
  BASE_WIDGET_VALIDATION,
  WidgetPropertyValidationType,
} from "utils/WidgetValidation";
import { DerivedPropertiesMap } from "utils/WidgetFactory";

class CanvasWidget extends ContainerWidget {
  static getPropertyPaneConfig() {
    return [];
  }
  static getWidgetType() {
    return "CANVAS_WIDGET";
  }

  getCanvasProps(): ContainerWidgetProps<WidgetProps> {
    return {
      ...this.props,
      parentRowSpace: 1,
      parentColumnSpace: 1,
      topRow: 0,
      leftColumn: 0,
      containerStyle: "none",
    };
  }

  renderAsDropTarget() {
    const canvasProps = this.getCanvasProps();
    console.log("Connected Widgets Canvas Widget", { canvasProps });
    return (
      <DropTargetComponent
        {...canvasProps}
        minHeight={this.props.minHeight || 380}
      >
        {this.renderAsContainerComponent(canvasProps)}
      </DropTargetComponent>
    );
  }

  render() {
    if (this.props.renderMode === RenderModes.CANVAS) {
      return this.renderAsDropTarget();
    }
    const snapRows = getCanvasSnapRows(
      this.props.bottomRow,
      this.props.canExtend,
    );
    const height = snapRows * GridDefaults.DEFAULT_GRID_ROW_HEIGHT;
    const style: CSSProperties = {
      width: "100%",
      height: `${height}px`,
      background: "none",
      position: "relative",
    };
    // This div is the DropTargetComponent alternative for the page view
    // DropTargetComponent and this div are responsible for the canvas height
    return (
      <div className={getCanvasClassName()} style={style}>
        {this.renderAsContainerComponent(this.getCanvasProps())}
      </div>
    );
  }

  static getPropertyValidationMap(): WidgetPropertyValidationType {
    return BASE_WIDGET_VALIDATION;
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }
  // TODO Find a way to enforce this, (dont let it be set)
  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }
}

export const CONFIG = {
  type: CanvasWidget.getWidgetType(),
  name: "Canvas",
  iconSVG: "",
  hideCard: true,
  defaults: {
    rows: 1,
    columns: 1,
    widgetName: "Canvas",
    detachFromLayout: true,
  },
  properties: {
    validations: CanvasWidget.getPropertyValidationMap(),
    derived: CanvasWidget.getDerivedPropertiesMap(),
    default: CanvasWidget.getDefaultPropertiesMap(),
    meta: CanvasWidget.getMetaPropertiesMap(),
    config: CanvasWidget.getPropertyPaneConfig(),
  },
};

export default CanvasWidget;
