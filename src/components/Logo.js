import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  width: 10rem;
  height: 5rem;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-40%) translateY(-30%) rotate(-45deg);
  text-align: center;
  z-index: 10;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background-color: black;
  color: #ffffffda;

  p {
    font-weight: 600;
    padding: 0.45rem;
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <p>UpNxt</p>
    </StyledLogo>
  );
};

export default Logo;
