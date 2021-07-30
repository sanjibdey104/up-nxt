import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";

const StyledTaskList = styled.ul`
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: scroll;
  padding: 1rem;
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
