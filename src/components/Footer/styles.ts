import styled from "styled-components";

export const Footer = styled.footer``;

export const WrapperLinks = styled.div`
  background-color: var(--primary-color);

  div {
    flex: 1;
    padding: 32px 12px;

    img {
      width: 100px;
    }

    strong {
      color: var(--secundary-color);
      padding: 8px 12px;
    }

    ul {
      list-style: none;
      color: #fff;

      li {
        padding: 8px 12px;
        a {
          display: block;
          color: #fff;
          text-decoration: none;
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
