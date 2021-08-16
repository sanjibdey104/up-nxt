import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import Logo from "./Logo";

const StyledNavbar = styled.nav`
  width: 100%;
  height: 3rem;
  padding: 2rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  #logo {
    position: static;
  }

  #sign-out-btn {
    width: 5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;

    font-size: 0.75rem;
    font-weight: 500;
    background-color: #efa135;
    box-shadow: 5px 5px #000;
    transition: all 200ms ease-in-out;

    &:hover {
      box-shadow: 3px 3px #000;
    }
  }

  .date {
    font-weight: 500;
  }
`;

const Navbar = () => {
  const dt = new Date();
  const today = dayjs(dt).format("MMM DD, ddd");

  return (
    <StyledNavbar>
      <Logo />
      <p className="date">{today}</p>
      <button id="sign-out-btn" onClick={() => auth.signOut()}>
        Sign-out
      </button>
    </StyledNavbar>
  );
};

export default Navbar;
