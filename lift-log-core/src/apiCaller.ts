import axios from "axios";
import { LogEntry } from "./store";

export const getLogEntries = (apiUrl: string) =>
  axios
    .get<ApiLiftLog>(apiUrl)
    .then(result =>
      result.data.entries.sort(byDateNewestFirst).map(toLogEntry)
    );

export const addLogEntry = (apiUrl: string, logEntry: LogEntry) =>
  axios.post(`${apiUrl}/lifts`, toApiLogEntry(logEntry));

const byDateNewestFirst = (entry: ApiLogEntry, otherEntry: ApiLogEntry) =>
  new Date(otherEntry.date).getTime() - new Date(entry.date).getTime();

const toLogEntry = (apiLogEntry: ApiLogEntry): LogEntry => ({
  name: apiLogEntry.name,
  weightLifted: apiLogEntry.weightLifted,
  sets: apiLogEntry.sets.map(s => s.numberOfReps)
});

const toApiLogEntry = (logEntry: LogEntry): ApiLogEntry => ({
  date: new Date().toISOString(),
  name: logEntry.name,
  weightLifted: logEntry.weightLifted,
  sets: logEntry.sets.map(reps => ({ numberOfReps: reps, rpe: null }))
});

type ApiSet = {
  numberOfReps: number;
  rpe: number | null;
};

type ApiLogEntry = {
  date: string;
  name: string;
  weightLifted: number;
  sets: ApiSet[];
};

type ApiLiftLog = {
  name: string;
  title: string;
  entries: ApiLogEntry[];
};
