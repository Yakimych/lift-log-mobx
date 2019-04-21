import { MainStore, InputMode } from "./store";

const validStringTestData = [
  { inputString: "0", expectedNumber: 0 },
  { inputString: "1", expectedNumber: 1 },
  { inputString: "10", expectedNumber: 10 },
  { inputString: "99", expectedNumber: 99 }
];

describe("MainStore", () => {
  test.each(validStringTestData)(
    "should set weightLifted to the parsed number for a valid string value",
    ({ inputString, expectedNumber }) => {
      const store = new MainStore("");
      store.setWeightLifted(inputString);
      expect(store.weightLifted).toEqual(expectedNumber);
    }
  );

  test.each(["", "invalid_number", "_1"])(
    "should set weightLifted to 0 for a non-valid string value",
    invalidInput => {
      const store = new MainStore("");
      store.setWeightLifted("100");
      store.setWeightLifted(invalidInput);

      expect(store.weightLifted).toEqual(0);
    }
  );

  test("should change custom set at correct index", () => {
    const store = new MainStore("");
    store.setInputMode(InputMode.CustomSets);
    store.addCustomSet();
    store.addCustomSet();
    store.addCustomSet();
    store.setCustomSetValue(1, "10");

    expect(store.customSets[1]).toEqual(10);
  });

  test("should be initialized with standard sets and reps when switching InputMode for the first time", () => {
    const store = new MainStore("");
    store.setNumberOfSets("10");
    store.setNumberOfReps("8");
    store.setInputMode(InputMode.CustomSets);

    expect(store.customSets.length).toEqual(10);
    expect(store.customSets.every(s => s === 8)).toBe(true);
  });

  test("should not be reinitialized with standard sets and reps when switching InputMode for the second time", () => {
    const store = new MainStore("");
    store.setNumberOfSets("10");
    store.setNumberOfReps("8");
    store.setInputMode(InputMode.CustomSets);
    store.setCustomSetValue(9, "7");
    store.setInputMode(InputMode.Standard);
    store.setInputMode(InputMode.CustomSets);

    expect(store.customSets[9]).toEqual(7);
  });

  test("should not be possible to add more than 10 custom sets", () => {
    const store = new MainStore("");
    store.setInputMode(InputMode.CustomSets);
    for (let i = 0; i < 11; i++) {
      store.addCustomSet();
    }

    expect(store.customSets.length).toEqual(10);
  });

  test("should not be possible to remove last custom set", () => {
    const store = new MainStore("");
    store.setInputMode(InputMode.CustomSets);
    for (let i = 0; i < 100; i++) {
      store.removeCustomSet(0);
    }

    expect(store.customSets.length).toEqual(1);
  });

  test("added custom set should default to the value of the last (previous) set", () => {
    const store = new MainStore("");
    store.setInputMode(InputMode.CustomSets);
    store.setCustomSetValue(2, "4");
    store.addCustomSet();

    expect(store.customSets[3]).toEqual(4);
  });

  test("should not be possible to change name while dialog is open", () => {
    const store = new MainStore("");
    store.setName("Bob");
    store.openDialog();
    store.setName("Alice");

    expect(store.name).toEqual("Bob");
  });

  test("should not be possible to open dialog if name is empty", () => {
    const store = new MainStore("");
    store.setName("");
    store.openDialog();

    expect(store.dialogIsOpen).toEqual(false);
  });

  test("should not be possible to input more than 10 sets", () => {
    const store = new MainStore("");
    store.setName("Bob");
    store.openDialog();
    store.setNumberOfSets("11");
    store.setInputMode(InputMode.CustomSets);

    expect(store.customSets.length).toEqual(10);
    expect(store.numberOfSets).toEqual(10);
  });
});
