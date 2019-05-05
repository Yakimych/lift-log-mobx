import * as React from "react";
import { MainStore } from "lift-log-core/lib/store";
import { observer } from "mobx-react";

const SetsReps = observer(({ store }: { store: MainStore }) => (
  <div className="sets-reps">
    <input
      type="text"
      className="sets-reps-input"
      value={store.numberOfSets}
      onChange={e => store.setNumberOfSets(e.target.value)}
    />
    x
    <input
      type="text"
      className="sets-reps-input"
      value={store.numberOfReps}
      onChange={e => store.setNumberOfReps(e.target.value)}
    />
  </div>
));

export default SetsReps;
