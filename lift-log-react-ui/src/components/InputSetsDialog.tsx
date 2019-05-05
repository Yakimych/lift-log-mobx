import * as React from "react";
import InputModeSwitch from "./InputModeSwitch";
import SetsReps from "./SetsReps";
import CustomSets from "./CustomSets";
import { MainStore, InputMode } from "lift-log-core/lib/store";
import { observer } from "mobx-react";

type Props = {
  store: MainStore;
  onClose: () => void;
  onConfirm: () => void;
};

const InputSetsDialog = observer(({ store, onClose, onConfirm }: Props) => (
  <div className="input-sets-dialog">
    <span className="component-annotation">InputSetsDialog</span>
    <InputModeSwitch
      inputMode={store.inputMode}
      onChange={store.setInputMode}
    />
    {store.inputMode === InputMode.Standard ? (
      <SetsReps store={store} />
    ) : (
      <CustomSets store={store} />
    )}
    <div className="bottom">
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
));

export default InputSetsDialog;
