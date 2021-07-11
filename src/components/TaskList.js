import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  console.log(tasks);
  return (
    <ul>
      {tasks && tasks.map((task) => <TaskCard key={task.key} task={task} />)}
    </ul>
  );
};

export default TaskList;
