import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import TaskListContainer from "./TaskListContainer";
import { DateContext } from "../context/DateContext";
import AppInfo from "./AppInfo";
import GreetUser from "./GreetUser";

const Homepage = styled.section`
  width: 95%;
  margin: 0 auto;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  /* padding: 0 1rem; */
`;

const Home = () => {
  const { tasks, currentTimestamp } = FetchAllTasks();

  return (
    <DateContext.Provider value={{ currentTimestamp }}>
      <Homepage>
        <Navbar />
        <GreetUser taskCount={tasks.length} />
        <AppInfo />
        <TaskListContainer tasks={tasks} />
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
