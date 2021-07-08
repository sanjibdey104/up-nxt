import React from "react";
import TaskCard from "./TaskCard";

const TodoTasks = ({ tasks }) => {
  return (
    <ul>
      {tasks && tasks.map((task) => <TaskCard key={task.key} task={task} />)}
    </ul>
  );
};

export default TodoTasks;
