import { ControllerRenderProps } from "react-hook-form";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { useCallback, useContext, useEffect, useRef } from "react";

import FormContext from "../FormContext";

type BaseEvents = Pick<
  HTMLInputElement,
  "onfocus" | "onblur" | "addEventListener" | "removeEventListener"
>;

type UseEventsProps = {
  onFocusDynamicString?: string;
  onBlurDynamicString?: string;
};

function useEvents<TElement extends BaseEvents>({
  onBlurDynamicString,
  onFocusDynamicString,
}: UseEventsProps = {}) {
  const FieldBlurHandlerRef = useRef<ControllerRenderProps["onBlur"]>();
  const inputRef = useRef<TElement | null>(null);
  const { executeAction } = useContext(FormContext) || {};

  const onBlurHandler = useCallback(() => {
    if (FieldBlurHandlerRef.current) {
      FieldBlurHandlerRef.current?.();
    }

    if (onBlurDynamicString) {
      executeAction?.({
        triggerPropertyName: "onBlur",
        dynamicString: onBlurDynamicString,
        event: {
          type: EventType.ON_BLUR,
        },
      });
    }
  }, [executeAction, onBlurDynamicString]);

  const onFocusHandler = useCallback(() => {
    if (onFocusDynamicString) {
      executeAction?.({
        triggerPropertyName: "onFocus",
        dynamicString: onFocusDynamicString,
        event: {
          type: EventType.ON_FOCUS,
        },
      });
    }
  }, [executeAction, onFocusDynamicString]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("blur", onBlurHandler);
      inputRef.current.addEventListener("focus", onFocusHandler);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("blur", onBlurHandler);
        inputRef.current.removeEventListener("focus", onFocusHandler);
      }
    };
  }, [inputRef.current, onBlurHandler, onFocusHandler]);

  const registerFieldOnBlurHandler = (
    blurHandler: ControllerRenderProps["onBlur"],
  ) => {
    FieldBlurHandlerRef.current = blurHandler;
  };

  return {
    inputRef,
    onBlurHandler,
    onFocusHandler,
    registerFieldOnBlurHandler,
  };
}

export default useEvents;
