import React, { FormEvent, useMemo, useRef, useState } from "react";
import { BookingFormData } from "../../../../App";
import * as S from "./styles";

type Occasion = "Birthday" | "Anniversary";
type TimesAction = { type: "dateChanged"; payload: string };

type Props = {
  availableTimes: string[];
  dispatch: React.Dispatch<TimesAction>;
  onSubmit: (data: BookingFormData) => Promise<boolean> | boolean;
};

export default function BookingForm({
  availableTimes,
  dispatch,
  onSubmit,
}: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState<"Birthday" | "Anniversary">(
    "Birthday"
  );

  const formRef = useRef<HTMLFormElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const timeRef = useRef<HTMLSelectElement | null>(null);
  const guestsRef = useRef<HTMLInputElement | null>(null);

  const todayISO = useMemo(() => new Date().toISOString().split("T")[0], []);
  const minGuests = 1;
  const maxGuests = 10;

  const errors = useMemo(() => {
    const out: Partial<Record<keyof BookingFormData, string>> = {};
    if (!date) out.date = "Select a date.";
    else if (date < todayISO) out.date = "Date cannot be in the past.";

    if (!time) out.time = "Select a time.";
    else if (!availableTimes.includes(time))
      out.time = "Selected time is not available.";

    if (!guests || Number.isNaN(guests)) out.guests = "Enter number of guests.";
    else if (guests < minGuests || guests > maxGuests)
      out.guests = `Guests must be between ${minGuests} and ${maxGuests}.`;

    if (!occasion) out.occasion = "Select an occasion.";

    return out;
  }, [date, time, guests, occasion, availableTimes, todayISO]);

  const isValidReact = Object.keys(errors).length === 0;

  function handleDateChange(value: string) {
    setDate(value);
    dateRef.current?.setCustomValidity("");
    dispatch({ type: "dateChanged", payload: value });
    setTime("");
  }

  function handleTimeChange(value: string) {
    setTime(value);
    timeRef.current?.setCustomValidity("");
  }

  function handleGuestsChange(value: string) {
    const n = Number(value);
    setGuests(n);
    guestsRef.current?.setCustomValidity("");
  }

  // ---- submit: HTML5 + React validation
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // 1) HTML5: usa checkValidity + mensagens customizadas quando preciso
    // (ex.: se usuário tentar submeter com campo vazio/fora do min/max)
    // 2) React: nossas regras extras (date >= hoje, time presente na lista)

    // define mensagens customizadas pontuais
    if (dateRef.current) {
      if (!date) dateRef.current.setCustomValidity("Please choose a date.");
      else if (date < todayISO)
        dateRef.current.setCustomValidity("Date cannot be in the past.");
      else dateRef.current.setCustomValidity("");
    }
    if (timeRef.current) {
      if (!time) timeRef.current.setCustomValidity("Please choose a time.");
      else if (!availableTimes.includes(time))
        timeRef.current.setCustomValidity("Selected time is not available.");
      else timeRef.current.setCustomValidity("");
    }
    if (guestsRef.current) {
      if (!guests)
        guestsRef.current.setCustomValidity("Enter the number of guests.");
      else if (guests < minGuests || guests > maxGuests)
        guestsRef.current.setCustomValidity(
          `Guests must be between ${minGuests} and ${maxGuests}.`
        );
      else guestsRef.current.setCustomValidity("");
    }

    const html5Ok = formRef.current?.checkValidity() ?? false;
    if (!html5Ok || !isValidReact) {
      // dispara mensagens nativas do navegador
      formRef.current?.reportValidity?.();
      return;
    }

    const payload: BookingFormData = { date, time, guests, occasion };
    await onSubmit(payload);
  }

  return (
    <S.Form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
      noValidate={false} // deixe true caso queira suprimir mensagens nativas do browser
      aria-labelledby="booking-title"
    >
      {/* DATE */}
      <label htmlFor="res-date">Choose date</label>
      <input
        ref={dateRef}
        id="res-date"
        type="date"
        min={todayISO} // HTML5: não permitir datas passadas
        required // HTML5: obrigatório
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
        aria-invalid={!!errors.date}
        aria-describedby="date-hint"
      />
      <small id="date-hint" style={{ color: errors.date ? "#c00" : "#555" }}>
        {errors.date ? errors.date : "Choose a date from today onward."}
      </small>

      {/* TIME */}
      <label htmlFor="res-time">Choose time</label>
      <select
        ref={timeRef}
        id="res-time"
        required // HTML5: obrigatório
        value={time}
        onChange={(e) => handleTimeChange(e.target.value)}
        aria-invalid={!!errors.time}
        aria-describedby="time-hint"
      >
        <option value="" disabled>
          Selecione um horário
        </option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <small id="time-hint" style={{ color: errors.time ? "#c00" : "#555" }}>
        {errors.time ? errors.time : "Times reflect your selected date."}
      </small>

      {/* GUESTS */}
      <label htmlFor="guests">Number of guests</label>
      <input
        ref={guestsRef}
        id="guests"
        type="number"
        required // HTML5: obrigatório
        inputMode="numeric"
        step={1}
        min={minGuests} // HTML5: 1
        max={maxGuests} // HTML5: 10
        value={Number.isNaN(guests) ? "" : guests}
        onChange={(e) => handleGuestsChange(e.target.value)}
        aria-invalid={!!errors.guests}
        aria-describedby="guests-hint"
        placeholder="1"
      />
      <small
        id="guests-hint"
        style={{ color: errors.guests ? "#c00" : "#555" }}
      >
        {errors.guests
          ? errors.guests
          : `Between ${minGuests} and ${maxGuests} guests.`}
      </small>

      {/* OCCASION */}
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        required // HTML5: obrigatório
        value={occasion}
        onChange={(e) => setOccasion(e.target.value as Occasion)}
        aria-invalid={!!errors.occasion}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!isValidReact} // React: desabilita se tiver erro
        aria-disabled={!isValidReact}
        style={{ marginTop: 8 }}
      >
        Make your reservation
      </button>
    </S.Form>
  );
}
