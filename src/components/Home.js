import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import { FetchAllTasks } from "../data/AllTasks";
import Navbar from "./Navbar";
import TaskListContainer from "./TaskListContainer";
import { DateContext } from "../context/DateContext";

const Homepage = styled.section`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  #username {
    font-weight: bolder;
    font-size: 1.1rem;
  }

  .greet {
    margin-top: 8rem;
    margin-bottom: 2rem;
  }
`;

const Home = () => {
  const { tasks, currentTimestamp } = FetchAllTasks();
  const { currentUser } = useContext(AuthContext);
  const { displayName, uid, photoURL } = currentUser;
  const firstName = displayName.split(" ")[0];

  return (
    <DateContext.Provider value={{ currentTimestamp }}>
      <Homepage>
        <Navbar uid={uid} photoSrc={photoURL} />
        <div className="greet">
          <p>
            Hey, <span id="username">{firstName} ☕</span>
          </p>
          <p className="message">Good to have you back.</p>
          <p>Now, let's get to work.</p>
        </div>
        <TaskListContainer tasks={tasks} currentTime={currentTimestamp} />
      </Homepage>
    </DateContext.Provider>
  );
};

export default Home;
