import React from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const StyledTaskListContainer = styled.section`
  width: 100%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  .task-status {
    min-height: 3.5rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: #e9ecef;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .status {
    font-size: 1.3rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    text-align: center;
  }
`;

const TaskListContainer = ({ tasks }) => {
  const taskStatus = ["backlog", "todo", "ongoing", "done"];

  return (
    <StyledTaskListContainer>
      {taskStatus.map((status) => (
        <div className="task-status" key={status}>
          <h2 className="status">{status}</h2>
          <TaskList tasks={tasks.filter((task) => task.status === status)} />
        </div>
      ))}
    </StyledTaskListContainer>
  );
};

export default TaskListContainer;
