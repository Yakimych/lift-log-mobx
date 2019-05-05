import * as React from "react";
import InputSetsDialog from "./InputSetsDialog";
import { canOpenDialog, MainStore } from "lift-log-core/lib/store";
import { observer } from "mobx-react";

const AddLogEntry = observer(({ store }: { store: MainStore }) => {
  const addEntryAndCloseDialog = () => {
    store.closeDialog();
    store.addEntry();
  };

  return (
    <div className="add-log-entry">
      <span className="component-annotation">AddLogEntry</span>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={store.name}
          onChange={e => store.setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Weight"
          value={store.weightLifted}
          onChange={e => store.setWeightLifted(e.target.value)}
        />
        <button
          disabled={!canOpenDialog(store.name)}
          onClick={store.openDialog}
        >
          Input sets
        </button>
      </div>
      {store.dialogIsOpen && (
        <InputSetsDialog
          onClose={store.closeDialog}
          onConfirm={addEntryAndCloseDialog}
          store={store}
        />
      )}
    </div>
  );
});

export default AddLogEntry;
