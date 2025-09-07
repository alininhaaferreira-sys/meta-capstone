import styled from "styled-components";

export const Wrapper = styled.header`
  padding: 12px 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 24px;

  @media (max-width: 767px) {
    display: none;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 24px;

    li {
      a {
        position: relative;
        color: var(--text-color);
        text-decoration: none;
        font-weight: 500;

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary-color);
          opacity: 0;
          transition: all 0.4s ease;
        }

        &:hover {
          &::before {
            opacity: 1;
          }
        }
      }
    }
  }
`;
