import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import * as S from "./styles";

const Header: React.FC = () => {
  return (
    <header>
      <Container>
        <Link to="/">
          <img src="/assets/images/logo.svg" alt="Little Lemon logo" />
        </Link>

        <S.Nav aria-label="Primary">
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
              <NavLink to="/order_online">Order online</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </S.Nav>
      </Container>
    </header>
  );
};

export default Header;
