import React, { useContext } from "react";
import { pick } from "lodash";

import DateComponent from "widgets/DatePickerWidget2/component";
import Field from "widgets/JSONFormWidget/component/Field";
import FormContext from "../FormContext";
import useEvents from "./useEvents";
import {
  FieldComponentBaseProps,
  BaseFieldComponentProps,
  FieldEventProps,
} from "../constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";

type DateComponentProps = FieldComponentBaseProps &
  FieldEventProps & {
    closeOnSelection: boolean;
    dateFormat: string;
    maxDate: string;
    minDate: string;
    onDateChange?: string;
    onDateSelected?: string;
    shortcuts: boolean;
  };

const COMPONENT_DEFAULT_VALUES: DateComponentProps = {
  closeOnSelection: false,
  dateFormat: "YYYY-MM-DD HH:mm",
  isDisabled: false,
  label: "",
  maxDate: "2121-12-31T18:29:00.000Z",
  minDate: "1920-12-31T18:30:00.000Z",
  shortcuts: false,
  isVisible: true,
};

type DateFieldProps = BaseFieldComponentProps<DateComponentProps>;

function DateField({ name, schemaItem, ...rest }: DateFieldProps) {
  const {
    onBlur: onBlurDynamicString,
    onFocus: onFocusDynamicString,
  } = schemaItem;
  const { executeAction } = useContext(FormContext);
  const { inputRef, registerFieldOnBlurHandler } = useEvents<HTMLInputElement>({
    onFocusDynamicString,
    onBlurDynamicString,
  });

  const labelStyles = pick(schemaItem, [
    "labelStyle",
    "labelTextColor",
    "labelTextSize",
  ]);

  return (
    <Field
      {...rest}
      defaultValue={schemaItem.defaultValue}
      label={schemaItem.label}
      labelStyles={labelStyles}
      name={name}
      render={({ field: { onBlur, onChange, value } }) => {
        const onDateSelected = (value: string) => {
          onChange(value);

          if (schemaItem.onDateSelected && executeAction) {
            executeAction({
              triggerPropertyName: "onDateSelected",
              dynamicString: schemaItem.onDateSelected,
              event: {
                type: EventType.ON_DATE_SELECTED,
              },
            });
          }
        };

        registerFieldOnBlurHandler(onBlur);

        return (
          <DateComponent
            closeOnSelection={schemaItem.closeOnSelection}
            dateFormat={schemaItem.dateFormat}
            datePickerType="DATE_PICKER"
            inputRef={inputRef}
            isDisabled={schemaItem.isDisabled}
            isLoading={false}
            label=""
            maxDate={schemaItem.maxDate}
            minDate={schemaItem.minDate}
            onDateSelected={onDateSelected}
            selectedDate={value}
            shortcuts={schemaItem.shortcuts}
            widgetId=""
          />
        );
      }}
    />
  );
}

DateField.componentDefaultValues = COMPONENT_DEFAULT_VALUES;

export default DateField;
