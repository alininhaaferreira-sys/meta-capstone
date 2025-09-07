export {};
declare global {
  function fetchAPI(date: Date): string[];
  function submitAPI(data: unknown): boolean | Promise<boolean>;
}
