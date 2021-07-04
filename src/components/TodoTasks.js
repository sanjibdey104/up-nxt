import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import TaskCard from "./TaskCard";

const TodoTasks = () => {
  const { tasks } = useContext(TaskListContext);
  const todoTasks = tasks.filter((task) => task.status === "todo");

  return (
    <ul>
      {todoTasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default TodoTasks;
