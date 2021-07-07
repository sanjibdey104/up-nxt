import React from "react";
import TaskCard from "./TaskCard";

const DoneTasks = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default DoneTasks;
