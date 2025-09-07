import styled from "styled-components";

export const Hero = styled.section`
  background-color: var(--primary-color);
  padding: 24px 0;
`;

export const ContentLeft = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  flex: 1;

  h1 {
    color: var(--secundary-color);
    font-size: 64px;
  }

  h2 {
    font-size: 32px;
  }

  h1,
  h2 {
    font-family: "Markazi Text", serif;
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

  img {
    width: 100%;
    border-radius: 16px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
