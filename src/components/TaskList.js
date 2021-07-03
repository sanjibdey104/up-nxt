import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";

const StyledTaskList = styled.ul`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const TaskList = ({ tasks, loading }) => {
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <StyledTaskList>
      {tasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </StyledTaskList>
  );
};

export default TaskList;
