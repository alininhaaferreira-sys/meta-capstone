import styled, { css } from "styled-components";
import { ContainerProps } from ".";

export const Container = styled.div<Partial<ContainerProps>>`
  ${({ direction }) => css`
    display: flex;
    flex-direction: ${direction};
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 576px) {
      max-width: 540px;
    }

    @media (min-width: 768px) {
      max-width: 720px;
    }

    @media (min-width: 992px) {
      max-width: 960px;
    }

    @media (min-width: 1200px) {
      max-width: 1140px;
    }

    @media (min-width: 1400px) {
      max-width: 1320px;
    }
  `}
`;
