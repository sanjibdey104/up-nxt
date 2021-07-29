import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Auth";

const StyledGreet = styled.section`
  width: 100%;
  height: 15rem;
  margin-right: auto;
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
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
  const { displayName, uid, photoURL } = currentUser;
  const firstName = displayName.split(" ")[0];

  return (
    <StyledGreet>
      <img src={photoURL} alt="user profile" id="profile-photo" />
      <p id="username">Hey, {firstName} ☕</p>
      <p>Good to have you back.</p>
      <p id="task-count">
        You've got <span>{taskCount}</span> today
      </p>
    </StyledGreet>
  );
};

export default GreetUser;
