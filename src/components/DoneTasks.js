import React from "react";
import TaskCard from "./TaskCard";

const DoneTasks = ({ doneTasks }) => {
  return (
    <ul>
      {doneTasks.length ? (
        doneTasks.map((task) => <TaskCard key={task.key} task={task} />)
      ) : (
        <p>"nothing here yet"</p>
      )}
    </ul>
  );
};

export default DoneTasks;
