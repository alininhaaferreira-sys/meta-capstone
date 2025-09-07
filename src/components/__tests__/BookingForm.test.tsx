import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "../../pages/BookingPage/partials/BookingForm";

describe("BookingForm – HTML5 attributes", () => {
  const availableTimes = ["17:00", "18:00", "19:00"];
  const dispatch = jest.fn();
  const onSubmit = jest.fn().mockResolvedValue(true);

  // congelar 'hoje' = 2025-09-05 só para este bloco
  const FROZEN_TODAY = "2025-09-05";

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    jest.setSystemTime(new Date(`${FROZEN_TODAY}T12:00:00Z`));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Step 1: aplica atributos HTML5 corretos", () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i) as HTMLInputElement;
    expect(dateInput).toBeRequired();
    expect(dateInput).toHaveAttribute("type", "date");
    // min deve ser hoje (congelado)
    expect(dateInput).toHaveAttribute("min", FROZEN_TODAY);

    const timeSelect = screen.getByLabelText(
      /choose time/i
    ) as HTMLSelectElement;
    expect(timeSelect).toBeRequired();

    const guestsInput = screen.getByLabelText(
      /number of guests/i
    ) as HTMLInputElement;
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");
    expect(guestsInput).toHaveAttribute("step", "1");
    expect(guestsInput).toHaveAttribute("placeholder", "1");

    const occasionSelect = screen.getByLabelText(
      /occasion/i
    ) as HTMLSelectElement;
    expect(occasionSelect).toBeRequired();
  });
});

describe("BookingForm – React validation (interactions)", () => {
  const availableTimes = ["17:00", "18:00", "19:00"];
  const dispatch = jest.fn();
  const onSubmit = jest.fn().mockResolvedValue(true);

  beforeEach(() => {
    jest.clearAllMocks();
    // timers reais aqui (evita timeouts com userEvent)
    jest.useRealTimers();
  });

  test("Step 2: botão desabilita quando houver erros; habilita quando válido", async () => {
    const user = userEvent.setup();
    const TODAY = new Date().toISOString().slice(0, 10);

    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });
    // estado inicial: inválido (sem data/hora)
    expect(submitBtn).toBeDisabled();

    // preencher todos os campos válidos
    await user.type(screen.getByLabelText(/choose date/i), TODAY);
    await user.selectOptions(screen.getByLabelText(/choose time/i), "18:00");
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "2");
    // occasion já tem default "Birthday"

    // todos válidos -> botão habilita
    expect(submitBtn).toBeEnabled();
  });

  test("Step 2: data no passado marca erro (aria-invalid + hint) e mantém botão desabilitado", async () => {
    const user = userEvent.setup();
    const TODAY = new Date().toISOString().slice(0, 10);

    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });

    // preencher válido e habilitar o botão primeiro
    await user.type(dateInput, TODAY);
    await user.selectOptions(timeSelect, "17:00");
    await user.clear(guestsInput);
    await user.type(guestsInput, "3");
    expect(submitBtn).toBeEnabled();

    // agora colocar data passada (ontem)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    await user.clear(dateInput);
    await user.type(dateInput, yesterday);

    // nossa validação em React ativa aria-invalid + hint vermelho
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
    const dateHint = screen.getByText(/date cannot be in the past/i);
    expect(dateHint).toBeInTheDocument();

    // botão volta a desabilitar
    expect(submitBtn).toBeDisabled();
  });

  test("Step 2: guests fora do range exibe erro e desabilita botão", async () => {
    const user = userEvent.setup();
    const TODAY = new Date().toISOString().slice(0, 10);

    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });

    // preencher quase tudo válido
    await user.type(dateInput, TODAY);
    await user.selectOptions(timeSelect, "19:00");
    await user.clear(guestsInput);

    // 0 convidados -> inválido
    await user.type(guestsInput, "0");
    expect(guestsInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/Enter number of guests./i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // 11 convidados -> inválido
    await user.clear(guestsInput);
    await user.type(guestsInput, "11");
    expect(guestsInput).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText(/Guests must be between 1 and 10./i)
    ).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // valor válido -> limpa erro, botão habilita
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");
    expect(guestsInput).toHaveAttribute("aria-invalid", "false");
    expect(submitBtn).toBeEnabled();
  });

  test("Step 2: select de horário precisa de valor (placeholder não conta)", async () => {
    const user = userEvent.setup();
    const TODAY = new Date().toISOString().slice(0, 10);

    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    );

    await user.type(screen.getByLabelText(/choose date/i), TODAY);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "2");

    const timeSelect = screen.getByLabelText(/choose time/i);
    // manter o valor vazio/placeholder
    expect(timeSelect).toHaveValue("");

    // botão deve seguir desabilitado
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });
    expect(submitBtn).toBeDisabled();
  });
});
