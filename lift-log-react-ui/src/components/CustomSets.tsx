import * as React from "react";
import { canAddCustomSet, MAX_NUMBER_OF_SETS } from "lift-log-core/lib/store";
import { MainStore } from "lift-log-core/lib/store";
import { observer } from "mobx-react";

const CustomSets = observer(({ store }: { store: MainStore }) => (
  <div className="custom-sets">
    <button
      disabled={!canAddCustomSet(store.customSets)}
      onClick={store.addCustomSet}
    >
      Add
    </button>
    {!canAddCustomSet(store.customSets) && (
      <span className="warning-message">
        Cannot add more than {MAX_NUMBER_OF_SETS} sets!
      </span>
    )}
    <div>
      {store.customSets.map((set, i) => (
        <div className="custom-set-container" key={i}>
          <input
            className="sets-reps-input"
            type="text"
            value={set}
            onChange={e => store.setCustomSetValue(i, e.target.value)}
          />
          <button
            className="delete-button"
            onClick={() => store.removeCustomSet(i)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
));

export default CustomSets;
