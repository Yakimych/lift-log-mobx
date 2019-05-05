import * as React from "react";
import { InputMode } from "lift-log-core/lib/store";

type Props = {
  inputMode: InputMode;
  onChange: (inputMode: InputMode) => void;
};

const InputModeSwitch: React.FunctionComponent<Props> = props => (
  <div className="input-mode-switch">
    <button
      onClick={_ => props.onChange(InputMode.Standard)}
      className={
        props.inputMode === InputMode.Standard ? "active-input-mode" : ""
      }
    >
      Standard
    </button>
    <button
      onClick={_ => props.onChange(InputMode.CustomSets)}
      className={
        props.inputMode === InputMode.CustomSets ? "active-input-mode" : ""
      }
    >
      Custom
    </button>
  </div>
);

export default InputModeSwitch;
