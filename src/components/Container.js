import React from "react";
import styled from "styled-components";
import { TaskListContext } from "../context/TaskListContext";
import { FetchAllTasks } from "../data/AllTasks";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import MainSection from "./MainSection";
import doodleNerdCat from "../images/doodle-nerd-cat.svg";

const StyledContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;

  #doodle-nerd-cat {
    z-index: 10;
    width: clamp(5.5rem, 10vw, 10rem);
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Container = () => {
  const [tasks, loading] = FetchAllTasks();

  return (
    <TaskListContext.Provider value={{ tasks: tasks, loading: loading }}>
      <StyledContainer>
        <img src={doodleNerdCat} alt="doodle nerd cat" id="doodle-nerd-cat" />
        <Logo />
        <Sidebar />
        <MainSection />
      </StyledContainer>
    </TaskListContext.Provider>
  );
};

export default Container;
