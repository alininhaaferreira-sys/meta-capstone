import React from "react";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import About from "./partials/About";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <S.Hero>
        <Container>
          <S.ContentLeft>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              euismod leo in fermentum sollicitudin. Praesent a augue non nisi
              auctor ornare vel eu ante.{" "}
            </p>
            <button type="button" onClick={() => navigate("/booking")}>
              Reserve a table
            </button>
          </S.ContentLeft>
          <S.ContentRight>
            <img src="/assets/images/restaurant.jpg" alt="restaurant image" />
          </S.ContentRight>
        </Container>
      </S.Hero>
      <About />
    </>
  );
};

export default Home;
