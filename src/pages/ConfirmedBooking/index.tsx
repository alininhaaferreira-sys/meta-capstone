import Container from "../../components/Container";
import * as S from "./styles";

export default function ConfirmedBooking() {
  return (
    <S.Wrapper>
      <S.Header>
        <Container direction="column">
          <h1>Booking confirmed 🎉</h1>
        </Container>
      </S.Header>

      <Container direction="column">
        <p>
          Seu horário foi reservado com sucesso. Te esperamos no Little Lemon!
        </p>
      </Container>
    </S.Wrapper>
  );
}
