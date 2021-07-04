import React, { useContext } from "react";
import { TaskListContext } from "../context/TaskListContext";
import TaskCard from "./TaskCard";

const DoneTasks = () => {
  const { tasks } = useContext(TaskListContext);
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <ul>
      {doneTasks.length ? (
        doneTasks.map((task) => <TaskCard key={task.key} task={task} />)
      ) : (
        <p>Looks clear</p>
      )}
    </ul>
  );
};

export default DoneTasks;
