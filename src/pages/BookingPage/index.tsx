import { BookingFormData, TimesAction } from "../../App";
import BookingForm from "./partials/BookingForm";

type Props = {
  availableTimes: string[];
  dispatch: React.Dispatch<TimesAction>;
  onSubmit: (data: BookingFormData) => Promise<boolean> | boolean;
};

export default function BookingPage({
  availableTimes,
  dispatch,
  onSubmit,
}: Props) {
  return (
    <section style={{ padding: 24 }}>
      <h2>Reserve sua mesa</h2>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    </section>
  );
}
