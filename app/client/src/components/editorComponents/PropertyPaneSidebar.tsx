import { tw } from "twind";
import * as Sentry from "@sentry/react";
import { useSelector } from "react-redux";
import React, { memo, useEffect, useRef, useMemo } from "react";

import PerformanceTracker, {
  PerformanceTransactionName,
} from "utils/PerformanceTracker";
import { getSelectedWidgets } from "selectors/ui";
import WidgetPropertyPane from "pages/Editor/PropertyPane";
import { previewModeSelector } from "selectors/editorSelectors";
import CanvasPropertyPane from "pages/Editor/CanvasPropertyPane";
import useHorizontalResize from "utils/hooks/useHorizontalResize";
import { getIsDraggingForSelection } from "selectors/canvasSelectors";
import MultiSelectPropertyPane from "pages/Editor/MultiSelectPropertyPane";
import { commentModeSelector } from "selectors/commentsSelectors";

type Props = {
  width: number;
  onDragEnd?: () => void;
  onWidthChange: (width: number) => void;
};

export const PropertyPaneSidebar = memo((props: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    onMouseDown,
    onMouseUp,
    onTouchStart,
    resizing,
  } = useHorizontalResize(
    sidebarRef,
    props.onWidthChange,
    props.onDragEnd,
    true,
  );
  const isPreviewMode = useSelector(previewModeSelector);
  const isCommentMode = useSelector(commentModeSelector);
  const selectedWidgets = useSelector(getSelectedWidgets);
  const isDraggingForSelection = useSelector(getIsDraggingForSelection);

  PerformanceTracker.startTracking(PerformanceTransactionName.SIDE_BAR_MOUNT);
  useEffect(() => {
    PerformanceTracker.stopTracking();
  });

  /**
   * renders the property pane:
   * 1. if no widget is selected -> CanvasPropertyPane
   * 2. if more than one widget is selected -> MultiWidgetPropertyPane
   * 3. if user is dragging for selection -> CanvasPropertyPane
   * 4. if only one widget is selected -> WidgetPropertyPane
   */
  const propertyPane = useMemo(() => {
    switch (true) {
      case selectedWidgets.length == 0:
        return <CanvasPropertyPane />;
      case selectedWidgets.length > 1:
        return <MultiSelectPropertyPane />;
      case isDraggingForSelection === true:
        return <CanvasPropertyPane />;
      case selectedWidgets.length === 1:
        return <WidgetPropertyPane />;
    }
  }, [selectedWidgets, isDraggingForSelection]);

  return (
    <div className={tw`relative`}>
      {/* RESIZOR */}
      <div
        className={tw`absolute top-0 left-0 w-2 h-full -ml-2 group z-4 cursor-ew-resize`}
        onMouseDown={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchStart={onTouchStart}
      >
        <div
          className={tw`w-1 h-full ml-1 bg-transparent group-hover:bg-blue-500 transform transition
            ${resizing && "bg-blue-500"}`}
        />
      </div>
      {/* PROPERTY PANE */}
      <div
        className={tw`js-property-pane-sidebar t--property-pane-sidebar bg-white flex h-full z-3 border-l border-gray-200 transform transition duration-400
          ${!isPreviewMode && "relative"} ${(isPreviewMode || isCommentMode) &&
          "fixed translate-x-full right-0"}`}
        ref={sidebarRef}
      >
        <div
          className={tw`h-full p-0 overflow-y-auto min-w-72 max-w-104`}
          style={{ width: props.width }}
        >
          {propertyPane}
        </div>
      </div>
    </div>
  );
});

PropertyPaneSidebar.displayName = "PropertyPaneSidebar";

export default Sentry.withProfiler(PropertyPaneSidebar);
