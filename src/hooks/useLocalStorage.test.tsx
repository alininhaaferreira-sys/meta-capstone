import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocalStorage } from "./useLocalStorage";

function TestComponent() {
  const [val, setVal] = useLocalStorage("greeting", "hello");
  return (
    <div>
      <p data-testid="val">{val}</p>
      <button onClick={() => setVal("ciao")}>set</button>
    </div>
  );
}

beforeEach(() => {
  // reset spies & storage
  jest.restoreAllMocks();
  localStorage.clear();
});

it("writes to localStorage when value changes", async () => {
  const spy = jest.spyOn(window.localStorage.__proto__, "setItem");
  const user = userEvent.setup();

  render(<TestComponent />);

  // initial write happens on first effect as well
  expect(spy).toHaveBeenCalledWith("greeting", JSON.stringify("hello"));

  await user.click(screen.getByRole("button", { name: /set/i }));
  expect(spy).toHaveBeenCalledWith("greeting", JSON.stringify("ciao"));
  expect(localStorage.getItem("greeting")).toBe(JSON.stringify("ciao"));
});
