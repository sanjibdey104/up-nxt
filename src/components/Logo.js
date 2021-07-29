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

  display: grid;
  place-content: center;

  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const Logo = () => {
  return <StyledLogo>UpNxt</StyledLogo>;
};

export default Logo;
