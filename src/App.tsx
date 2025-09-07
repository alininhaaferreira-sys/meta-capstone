// App.tsx (ou Main.tsx)
import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { initializeTimes, updateTimes } from "./state/times";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Container from "./components/Container";
import Header from "./components/Header";
import Home from "./pages/Home";

export type BookingFormData = {
  date: string;
  time: string;
  guests: number;
  occasion: "Birthday" | "Anniversary";
};

export type TimesAction = { type: "dateChanged"; payload: string };

export default function App() {
  const navigate = useNavigate();

  const todayISO = new Date().toISOString().split("T")[0];
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    todayISO,
    initializeTimes
  );

  async function submitForm(data: BookingFormData) {
    const ok = window.submitAPI
      ? await Promise.resolve(window.submitAPI(data))
      : true;
    if (ok) navigate("/booking/confirmed");
    return ok;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              onSubmit={submitForm}
            />
          }
        />
        <Route path="/booking/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </>
  );
}
