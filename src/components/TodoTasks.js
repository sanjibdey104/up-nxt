import React from "react";
import TaskCard from "./TaskCard";

const TodoTasks = ({ todoTasks }) => {
  return (
    <ul>
      {todoTasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default TodoTasks;
