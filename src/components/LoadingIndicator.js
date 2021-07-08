import React from "react";
import styled from "styled-components";

const StyledIndicator = styled.div`
  width: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    width: 100%;
    height: 0.5rem;
    background: linear-gradient(
      90deg,
      rgba(6, 2, 71, 1) 0%,
      rgba(9, 9, 121, 1) 34%,
      rgba(0, 212, 255, 1) 100%
    );
    animation: equalize 300ms steps(20, end) 0s infinite;
  }

  span:nth-child(1) {
    animation-delay: 0ms;
  }
  span:nth-child(2) {
    animation-delay: 50ms;
  }
  span:nth-child(3) {
    animation-delay: 100ms;
  }

  @keyframes equalize {
    0% {
      width: 10%;
    }
    25% {
      width: 25%;
    }
    50% {
      width: 50%;
    }
    75% {
      width: 75%;
    }
    100% {
      width: 100%;
    }
  }
`;

const LoadingIndicator = () => {
  return (
    <StyledIndicator>
      <span></span>
      <span></span>
      <span></span>
    </StyledIndicator>
  );
};

export default LoadingIndicator;
