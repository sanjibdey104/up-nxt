import React from "react";
import styled from "styled-components";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import TaskListContainer from "./TaskListContainer";
import { DateContext } from "../context/DateContext";
import AppInfo from "./AppInfo";
import GreetUser from "./GreetUser";
import AddTask from "./AddTask";

const Homepage = styled.section`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  position: relative;

  @media (max-width: 600px) {
    width: 90%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  border: 1px solid blue;
`;

const Main = styled.main`
  display: flex;
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));

  .section-one {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
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
            {/* <AppInfo /> */}
            <TaskListContainer tasks={tasks} />
          </section>
          <section className="section-two">
            <AddTask />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Distinctio autem laboriosam ex eos odit, sequi repudiandae porro
              eum unde nostrum quisquam commodi assumenda voluptatibus minus
              suscipit aliquam natus necessitatibus! Suscipit.
            </p>
          </section>
        </Main>
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
