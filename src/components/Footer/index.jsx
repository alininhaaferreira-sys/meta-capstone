import * as S from "./styles";
import { Link, NavLink } from "react-router-dom";
import Container from "../Container";

function Footer() {
  return (
    <S.Footer>
      <S.WrapperLinks>
        <Container>
          <div>
            <Link to="/">
              <img src="/assets/images/logo.svg" alt="Little Lemon logo" />
            </Link>
          </div>
          <div>
            <strong>Navigation</strong>
            <ul>
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/menu">Menu</NavLink>
              </li>
              <li>
                <NavLink to="/booking">Reservations</NavLink>
              </li>
              <li>
                <NavLink to="/orderOnline">Order online</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <strong>Contact</strong>
            <ul>
              <li>Street St. Louis 123</li>
              <li>contact@littlelemon.com</li>
              <li>(123) 4444-4444</li>
            </ul>
          </div>
        </Container>
      </S.WrapperLinks>
      <S.WrapperCopyright>
        <Container>
          <p>&copy; 2025 Made with love by Aline Ferreira 🫶</p>
        </Container>
      </S.WrapperCopyright>
    </S.Footer>
  );
}

export default Footer;
