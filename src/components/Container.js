import React from "react";
import { TaskListContext } from "../context/TaskListContext";
import { FetchAllTasks } from "../data/AllTasks";
import Logo from "./Logo";
import MainSection from "./MainSection";
import Sidebar from "./Sidebar";

const Container = () => {
  const [tasks, loading] = FetchAllTasks();

  return (
    <TaskListContext.Provider value={{ tasks: tasks, loading: loading }}>
      <div className="container">
        <Logo />
        <Sidebar />
        <MainSection />
      </div>
    </TaskListContext.Provider>
  );
};

export default Container;
