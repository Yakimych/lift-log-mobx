import * as React from "react";
import SingleLogEntry from "./SingleLogEntry";
import { observer } from "mobx-react";
import { MainStore } from "lift-log-core/lib/store";

const LogEntryList = observer(({ store }: { store: MainStore }) => (
  <div className="log-entry-list">
    <span className="component-annotation">LogEntryList</span>
    {store.logEntries.map((entry, i) => (
      <SingleLogEntry
        key={i}
        name={entry.name}
        weightLifted={entry.weightLifted}
        sets={entry.sets}
      />
    ))}
  </div>
));

export default LogEntryList;
