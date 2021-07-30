import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import { FetchAllTasks } from "../data/AllTasks";

const StyledGreet = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  margin-bottom: 2rem;

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
  const { tasks } = FetchAllTasks();
  const { currentUser } = useContext(AuthContext);
  const { displayName, photoURL } = currentUser;
  const firstName = displayName.split(" ")[0];

  // fetching current day task count (excluding 'done' status)
  const today = new Date();
  const currentDayTaskCount = tasks.filter(
    (task) => task.createdAt.toDate().getDate() === today.getDate()
  ).length;

  return (
    <StyledGreet>
      <img src={photoURL} alt="user profile" id="profile-photo" />
      <p id="username">Hey, {firstName} ☕</p>
      <p>Good to have you back.</p>
      <p id="task-count">
        You've got <span>{currentDayTaskCount}</span> tasks today 📝
      </p>
    </StyledGreet>
  );
};

export default GreetUser;
