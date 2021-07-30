import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import TaskListContainer from "./TaskListContainer";
import { DateContext } from "../context/DateContext";
import GreetUser from "./GreetUser";
import AddTask from "./AddTask";
import TodayTasks from "./TodayTasks";

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

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3rem;
  border: 1px solid blue;

  .section-one,
  .section-two {
    width: 100%;
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
  }

  .section-two {
    height: 20rem;
    padding: 1rem 0;
    & > * {
      flex-grow: 1;
      height: 100%;
    }
  }

  /* .section-one {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
  }

  .section-two {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
`;

const Home = () => {
  const { tasks, currentTimestamp } = FetchAllTasks();

  return (
    <DateContext.Provider value={{ currentTimestamp }}>
      <Homepage>
        <Navbar />
        <Main>
          <section className="section-one">
            <GreetUser taskCount={tasks.length} />
            <AddTask />
          </section>
          <section className="section-two">
            <TodayTasks tasks={tasks} />
            <TaskListContainer tasks={tasks} />
          </section>
        </Main>
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
