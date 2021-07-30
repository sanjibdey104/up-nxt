import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import TaskListContainer from "./TaskListContainer";
import { DateContext } from "../context/DateContext";
import GreetUser from "./GreetUser";
import AddTask from "./AddTask";
import dayjs from "dayjs";
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
  gap: 5rem;
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;

  /* @media (max-width: 800px) {
    flex-direction: column-reverse;
  } */

  & > * {
    flex: 1;
  }

  .section-one {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
  }

  .section-two {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
            <TodayTasks tasks={tasks} />
          </section>
          <section className="section-two">
            <AddTask />
            <TaskListContainer tasks={tasks} />
          </section>
        </Main>
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
