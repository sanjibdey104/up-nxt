import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import { DateContext } from "../context/DateContext";
import GreetUser from "./GreetUser";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import { TaskProvider } from "../context/TaskContext";

const Homepage = styled.section`
  width: 80%;
  margin: 0 auto;
  position: relative;
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    width: 95%;
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
  gap: 4rem;

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
  const { currentTimestamp } = FetchAllTasks();

  return (
    <TaskProvider>
      <DateContext.Provider value={{ currentTimestamp }}>
        <Homepage>
          <Navbar />
          <MainSection>
            <GreetUser />
            <AddTask />
            <AllTasks />
          </MainSection>
        </Homepage>
      </DateContext.Provider>
    </TaskProvider>
  );
};

export default Home;
