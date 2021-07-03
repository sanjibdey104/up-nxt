import React from "react";
import styled from "styled-components";
import TaskCard from "./TaskCard";

const OnGoingTasks = ({ ongoingTasks }) => {
  return (
    <ul>
      {ongoingTasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default OnGoingTasks;
