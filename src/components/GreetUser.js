import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Auth";

const StyledGreet = styled.section`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  font-size: 1.1rem;

  #profile-photo {
    width: 3rem;
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  #task-count {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const GreetUser = ({ taskCount }) => {
  const { currentUser } = useContext(AuthContext);
  const { displayName, photoURL } = currentUser;
  const firstName = displayName.split(" ")[0];

  return (
    <StyledGreet>
      <img src={photoURL} alt="user profile" id="profile-photo" />
      <p id="username">Hey, {firstName} ☕</p>
      <p>Good to have you back.</p>
      <p id="task-count">
        You've got <span>{taskCount}</span> tasks today
      </p>
    </StyledGreet>
  );
};

export default GreetUser;
