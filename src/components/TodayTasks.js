import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import TaskList from "./TaskList";

const StyledTodayTasks = styled.section`
  padding: 1rem 0;
  overflow-y: scroll;
  /* border: 1px solid black; */

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #efa135;
    border-radius: 1rem;
  }
`;

const TodayTasks = () => {
  const { tasks } = FetchAllTasks();
  const today = new Date();
  const tasksForToday = tasks.filter(
    (task) =>
      task.createdAt.toDate().getDate() === today.getDate() &&
      task.status !== "done"
  );

  return (
    <StyledTodayTasks>
      <TaskList tasks={tasksForToday} />
    </StyledTodayTasks>
  );
};

export default TodayTasks;
