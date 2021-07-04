import React from "react";
import styled from "styled-components";
import { FaTasks } from "react-icons/fa";

const StyledLogo = styled.div`
  width: 5rem;
  position: absolute;
  left: 0.5rem;
  top: 1rem;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-weight: 600;
    padding: 0.45rem;
  }

  #icon {
    font-size: 1.5rem;
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <p>UpNxt</p>
      <FaTasks id="icon" />
    </StyledLogo>
  );
};

export default Logo;
