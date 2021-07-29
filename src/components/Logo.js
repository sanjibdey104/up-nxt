import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  width: 4.5rem;
  height: 2rem;
  padding: 0.2rem;
  border-radius: 0.5rem 0.85rem;

  font-size: 0.85rem;
  font-weight: 500;
  color: #f3f3f3;
  background-color: #000;
  box-shadow: 5px 5px #efa135;

  display: grid;
  place-content: center;

  position: absolute;
  top: 1rem;
  left: 1rem;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow: 2px 2px #efa135;
  }
`;

const Logo = () => {
  return <StyledLogo id="logo">UpNxt</StyledLogo>;
};

export default Logo;
