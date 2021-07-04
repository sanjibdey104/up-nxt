import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import TaskCard from "./TaskCard";

const BacklogTasks = () => {
  const { tasks } = useContext(TaskListContext);
  const backlogTasks = tasks.filter((task) => task.status === "backlog");

  return (
    <ul>
      {backlogTasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default BacklogTasks;
