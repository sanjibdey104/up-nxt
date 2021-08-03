import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import { DateContext } from "../context/DateContext";
import GreetUser from "./GreetUser";
import AddTask from "./AddTask";
import TodayTasks from "./TodayTasks";
import AllTasks from "./AllTasks";

const Homepage = styled.section`
  width: 75%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 600px) {
    width: 90%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const MainSection = styled.main`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  h2 {
    text-align: center;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  & > * {
    max-width: 100%;
  }

  .tasks-repo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 3rem;

    & > * {
      flex-grow: 1;
    }
  }
`;

const Home = () => {
  const { tasks, currentTimestamp } = FetchAllTasks();

  return (
    <DateContext.Provider value={{ currentTimestamp }}>
      <Homepage>
        <Navbar />
        <MainSection>
          <GreetUser taskCount={tasks.length} />
          <AddTask />
          <TodayTasks tasks={tasks} />
          <AllTasks tasks={tasks} />
        </MainSection>
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
