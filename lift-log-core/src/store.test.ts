import { sum } from "./store";

describe("asd", () => {
  it("1 + 2 should return 3", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
