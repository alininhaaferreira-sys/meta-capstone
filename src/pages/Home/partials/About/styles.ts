import { HEROKU } from "./../../../../../node_modules/ci-info/index.d";
import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 24px 0;
  height: 605px;
`;

export const ContentLeft = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;
  color: var(--primary-color);
  flex: 1;

  h1 {
    color: var(--primary-color);
    font-size: 48px;
  }

  button {
    color: var(--primary-color);
    background-color: var(--secundary-color);
    padding: 8px 16px;
    border-radius: 16px;
    border: none;
    font-weight: 600;
    align-self: flex-start;
    cursor: pointer;
  }
`;

export const ContentRight = styled.div`
  flex: 1;
  padding-left: 12px;
  position: relative;

  div {
    border-radius: 16px;
    position: absolute;
    width: 272px;
    height: 338px;
    overflow: hidden;

    &:first-child {
      top: 80%;
    }

    &:last-child {
      left: 20%;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
