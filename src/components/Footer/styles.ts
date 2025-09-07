import styled from "styled-components";

export const Footer = styled.footer``;

export const WrapperLinks = styled.div`
  background-color: #ccc;

  div {
    padding: 32px 12px;

    strong {
      color: var(--primary-color);
      padding: 8px 12px;
    }

    ul {
      list-style: none;

      li {
        a {
          display: block;
          color: #000;
          text-decoration: none;
          padding: 8px 12px;
        }
      }
    }
  }
`;

export const WrapperCopyright = styled.section`
  background-color: #161c2d;
  color: #fff;
  padding: 18px;

  p {
    width: 100%;
    text-align: center;
  }
`;
