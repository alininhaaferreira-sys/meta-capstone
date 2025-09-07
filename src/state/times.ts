export type TimesAction = { type: "dateChanged"; payload: string };

declare global {
  interface Window {
    fetchAPI?: (date: Date) => string[];
    submitAPI?: (data: unknown) => boolean | Promise<boolean>;
  }
}

export const BASE_TIMES = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export function initializeTimes(initialDateISO: string): string[] {
  try {
    const date = new Date(initialDateISO);
    return typeof fetchAPI === "function" ? fetchAPI(date) : [...BASE_TIMES];
  } catch {
    return [...BASE_TIMES];
  }
}

export function updateTimes(
  state: string[],
  action: { type: "dateChanged"; payload: string }
): string[] {
  if (action.type === "dateChanged") {
    try {
      const date = new Date(action.payload);
      return typeof fetchAPI === "function" ? fetchAPI(date) : state;
    } catch {
      return state;
    }
  }
  return state;
}
