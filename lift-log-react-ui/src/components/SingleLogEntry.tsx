import * as React from "react";
import { LogEntry } from "lift-log-core/lib/store";

const allSetsAreEqual = (sets: number[]): boolean =>
  sets.every(s => s === sets[0]);

const formatSets = (sets: number[]): string =>
  allSetsAreEqual(sets) ? `${sets.length}x${sets[0]}` : sets.join("-");

const SingleLogEntry: React.FunctionComponent<LogEntry> = logEntry => (
  <div className="single-log-entry">
    <span className="lifter-name">{logEntry.name}</span>
    <span className="weight-lifted">{logEntry.weightLifted}</span>
    <span className="lifter-sets">{formatSets(logEntry.sets)}</span>
  </div>
);

export default SingleLogEntry;
