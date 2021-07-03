import React from "react";
import TaskCard from "./TaskCard";

const DoneTasks = ({ doneTasks }) => {
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
