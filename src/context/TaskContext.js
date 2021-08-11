import { createContext } from "react";
import { FetchAllTasks } from "../data/AllTasks";
export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { tasks } = FetchAllTasks();

  return (
    <TaskContext.Provider value={{ tasks }}>{children}</TaskContext.Provider>
  );
};
