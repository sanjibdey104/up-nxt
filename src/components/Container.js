import React from "react";
import styled from "styled-components";
import { TaskListContext } from "../context/TaskListContext";
import { FetchAllTasks } from "../data/AllTasks";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import MainSection from "./MainSection";

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  background: linear-gradient(45deg, #a9d6e5, #89c2d9, #61a5c2);
`;

const Container = () => {
  const [tasks, loading] = FetchAllTasks();

  return (
    <TaskListContext.Provider value={{ tasks: tasks, loading: loading }}>
      <StyledContainer>
        <Logo />
        <Sidebar />
        <MainSection />
      </StyledContainer>
    </TaskListContext.Provider>
  );
};

export default Container;
