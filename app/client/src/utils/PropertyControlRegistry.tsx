import React from "react";
import PropertyControlFactory from "./PropertyControlFactory";
import InputTextControl, {
  InputControlProps,
} from "../propertyControls/InputTextControl";
import DropDownControl, {
  DropDownControlProps,
} from "../propertyControls/DropDownControl";
import SwitchControl, {
  SwitchControlProps,
} from "../propertyControls/SwitchControl";

class PropertyControlRegistry {
  static registerPropertyControlBuilders() {
    PropertyControlFactory.registerControlBuilder("INPUT_TEXT", {
      buildPropertyControl(controlProps: InputControlProps): JSX.Element {
        return <InputTextControl {...controlProps} />;
      },
    });
    PropertyControlFactory.registerControlBuilder("DROP_DOWN", {
      buildPropertyControl(controlProps: DropDownControlProps): JSX.Element {
        return <DropDownControl {...controlProps} />;
      },
    });
    PropertyControlFactory.registerControlBuilder("SWITCH", {
      buildPropertyControl(controlProps: SwitchControlProps): JSX.Element {
        return <SwitchControl {...controlProps} />;
      },
    });
  }
}

export default PropertyControlRegistry;
