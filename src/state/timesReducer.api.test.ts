import { initializeTimes, updateTimes } from "./times";

declare global {
  interface Window {
    fetchAPI?: (date: Date) => string[];
  }
}

const MOCK_TIMES = ["17:00", "18:00", "19:00"];

beforeEach(() => {
  // Cria a função para que possamos inspecionar chamadas
  Object.defineProperty(window, "fetchAPI", {
    configurable: true,
    writable: true,
    value: jest.fn((date: Date) => MOCK_TIMES),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("initializeTimes retorna horários da fetchAPI para a data inicial", () => {
  const initialDate = "2025-09-05";

  const result = initializeTimes(initialDate);

  expect(window.fetchAPI).toHaveBeenCalledTimes(1);
  const calledWith = (window.fetchAPI as jest.Mock).mock.calls[0][0] as Date;
  expect(calledWith.toISOString().slice(0, 10)).toBe(initialDate);
  expect(result).toEqual(MOCK_TIMES);
});

test("updateTimes usa a data do dispatch e retorna horários da API", () => {
  const action = { type: "dateChanged", payload: "2025-09-06" } as const;

  const result = updateTimes(["20:00"], action);

  expect(window.fetchAPI).toHaveBeenCalledTimes(1);
  const calledWith = (window.fetchAPI as jest.Mock).mock.calls[0][0] as Date;
  expect(calledWith.toISOString().slice(0, 10)).toBe(action.payload);
  expect(result).toEqual(MOCK_TIMES);
});
