import { BookingFormData, TimesAction } from "../../App";
import Container from "../../components/Container";
import BookingForm from "./partials/BookingForm";
import * as S from "./styles";

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
    <S.Wrapper>
      <S.Header>
        <Container direction="column">
          <h1>Reserve a table</h1>
        </Container>
      </S.Header>

      <Container>
        <BookingForm
          availableTimes={availableTimes}
          dispatch={dispatch}
          onSubmit={onSubmit}
        />
      </Container>
    </S.Wrapper>
  );
}
