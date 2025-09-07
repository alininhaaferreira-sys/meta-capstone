import React from "react";
import Container from "../../../../components/Container";
import * as S from "./styles";

const About: React.FC = () => {
  return (
    <S.Wrapper id="aboutSection">
      <Container>
        <S.ContentLeft>
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit.
          </p>
        </S.ContentLeft>
        <S.ContentRight>
          <div>
            <img src="/assets/images/restaurant.jpg" alt="restaurant image" />
          </div>
          <div>
            <img
              src="/assets/images/restauranfood.jpg"
              alt="restaurant food image"
            />
          </div>
        </S.ContentRight>
      </Container>
    </S.Wrapper>
  );
};

export default About;
