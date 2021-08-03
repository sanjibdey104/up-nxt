import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";

const StyledTaskList = styled.ul`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;

  li {
    flex: 0 0 auto;
  }
`;

const TaskList = ({ tasks }) => {
  return (
    <StyledTaskList>
      {tasks.length ? (
        tasks.map((task) => <TaskCard key={task.key} task={task} />)
      ) : (
        <p>nothing in the bucket</p>
      )}
    </StyledTaskList>
  );
};

export default TaskList;
