// App.tsx (ou Main.tsx)
import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { initializeTimes, updateTimes } from "./state/times";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import OrderOnline from "./pages/OrderOnline";
import About from "./pages/About";
import Footer from "./components/Footer";

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
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
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
        <Route path="/orderOnline" element={<OrderOnline />} />
        <Route path="/booking/confirmed" element={<ConfirmedBooking />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
