import { IObservableArray, observable, action } from "mobx";
import { getLogEntries, addLogEntry } from "./apiCaller";

const DEFAULT_NUMBER_OF_SETS = 3;
const DEFAULT_NUMBER_OF_REPS = 5;

const toInt = (stringValue: string) => {
  const parsedValue = parseInt(stringValue, 10);
  return isNaN(parsedValue) ? 0 : parsedValue;
};

const toValidNumberOfSets = (stringValue: string) => {
  const intValue = toInt(stringValue);
  return Math.min(intValue, MAX_NUMBER_OF_SETS);
};

export const MAX_NUMBER_OF_SETS = 10;
export const canAddCustomSet = (customSets: number[]) =>
  customSets.length < MAX_NUMBER_OF_SETS;

const canRemoveCustomSet = (customSets: number[]) => customSets.length > 1;

const canChangeName = (dialogIsOpen: boolean) => !dialogIsOpen;

export const canOpenDialog = (name: string) => name !== "";

export const setsFromSetsReps = (numberOfSets: number, numberOfReps: number) =>
  Array(numberOfSets).fill(numberOfReps);

export enum InputMode {
  Standard = "Standard",
  CustomSets = "CustomSets"
}

export type LogEntry = {
  name: string;
  weightLifted: number;
  sets: number[];
};

export class MainStore {
  private apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  @observable isLoading: boolean = true;
  @observable errorMessage: string = "";
  @observable logEntries: IObservableArray<LogEntry> = observable([]);

  @observable name: string = "";
  @observable weightLifted: number = 0;

  @observable dialogIsOpen: boolean = false;

  @observable inputMode: InputMode = InputMode.Standard;
  @observable numberOfSets: number = DEFAULT_NUMBER_OF_SETS;
  @observable numberOfReps: number = DEFAULT_NUMBER_OF_REPS;
  @observable customSets: IObservableArray<number> = observable([]);

  @action
  setEntryAddedSuccess = () => {
    this.isLoading = false;
    this.errorMessage = "";
  };

  @action
  setName = (newValue: string) => {
    if (canChangeName(this.dialogIsOpen)) {
      this.name = newValue;
    }
  };

  @action
  setWeightLifted = (newValue: string) => (this.weightLifted = toInt(newValue));

  @action
  openDialog = () => {
    if (canOpenDialog(this.name)) {
      this.dialogIsOpen = true;
    }
  };

  @action
  closeDialog = () => (this.dialogIsOpen = false);

  @action
  setNumberOfSets = (stringValue: string) =>
    (this.numberOfSets = toValidNumberOfSets(stringValue));

  @action
  setNumberOfReps = (stringValue: string) =>
    (this.numberOfReps = toInt(stringValue));

  @action
  setInputMode = (newValue: InputMode) => {
    const isFirstTimeSwitching = this.customSets.length === 0;
    if (isFirstTimeSwitching) {
      this.customSets.replace(
        setsFromSetsReps(this.numberOfSets, this.numberOfReps)
      );
    }
    this.inputMode = newValue;
  };

  @action
  addCustomSet = () => {
    if (canAddCustomSet(this.customSets)) {
      const lastSetValue = this.customSets[this.customSets.length - 1];
      this.customSets.push(lastSetValue);
    }
  };

  @action
  removeCustomSet = (indexToRemove: number) => {
    if (canRemoveCustomSet(this.customSets)) {
      const filteredArray = this.customSets.filter(
        (_, index) => index !== indexToRemove
      );
      this.customSets.replace(filteredArray);
    }
  };

  @action
  setCustomSetValue = (index: number, stringValue: string) =>
    (this.customSets[index] = toInt(stringValue));

  // async actions
  @action
  fetchLogEntries = () => {
    this.isLoading = true;
    getLogEntries(this.apiUrl)
      .then(entries => {
        this.isLoading = false;
        this.errorMessage = "";
        this.logEntries.replace(entries);
      })
      .catch(_ => (this.errorMessage = "Loading failed"));
  };

  getSetsFromState = (): number[] =>
    this.inputMode === InputMode.CustomSets
      ? this.customSets
      : setsFromSetsReps(this.numberOfSets, this.numberOfReps);

  @action
  addEntry = () => {
    this.isLoading = true;
    const newLogEntry: LogEntry = {
      name: this.name,
      weightLifted: this.weightLifted,
      sets: this.getSetsFromState()
    };
    addLogEntry(this.apiUrl, newLogEntry)
      .then(() => {
        this.isLoading = false;
        this.errorMessage = "";
      })
      .catch(_ => (this.errorMessage = "Adding entry failed"))
      .finally(() => this.fetchLogEntries());
  };
}
