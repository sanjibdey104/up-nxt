import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import TaskCard from "./TaskCard";

const OnGoingTasks = () => {
  const { tasks } = useContext(TaskListContext);
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");

  return (
    <ul>
      {ongoingTasks.map((task) => (
        <TaskCard key={task.key} task={task} />
      ))}
    </ul>
  );
};

export default OnGoingTasks;
