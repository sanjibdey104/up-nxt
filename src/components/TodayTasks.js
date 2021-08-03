import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import TaskList from "./TaskList";

const StyledTodayTasks = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
      <h2>Tasks for today</h2>
      <TaskList tasks={tasksForToday} />
    </StyledTodayTasks>
  );
};

export default TodayTasks;
