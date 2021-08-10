import { useState } from "react";

export const useTask = (task) => {
  //   const [task, setTask] = useState(taskItem);
  const [subtaskArr, setSubtaskArr] = useState(task.subtasks);

  return [subtaskArr, setSubtaskArr];
};
