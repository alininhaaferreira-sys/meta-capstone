import { BASE_TIMES, initializeTimes, updateTimes } from "../../state/times";

describe("times reducer helpers", () => {
  test("initializeTimes returns the expected initial list", () => {
    const initialDate = "2025-09-05";
    const result = initializeTimes(initialDate);
    expect(result).toEqual(BASE_TIMES);
    expect(result).not.toBe(BASE_TIMES);
  });

  test("updateTimes returns the same state (identity) for now", () => {
    const currentState = ["17:00", "18:00", "19:00"];
    const action = { type: "dateChanged", payload: "2025-09-06" } as const;
    const result = updateTimes(currentState, action);

    expect(result).toEqual(currentState);
  });
});
