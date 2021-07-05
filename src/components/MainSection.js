import React, { useContext } from "react";
import styled from "styled-components";
import TaskListContainer from "./TaskListContainer";
import { TaskListContext } from "../context/TaskListContext";
import doodleNerdCat from "../images/doodle-nerd-cat.svg";

const Main = styled.main`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 5rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  margin-top: 7.5rem;

  @media (max-width: 768px) {
    width: 90%;
  }

  #quote {
    width: 10rem;
    margin: 0 auto;
    font-style: italic;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 3rem;

    display: flex;
    gap: 1rem;
    align-items: center;

    p {
      &::before {
        content: open-quote;
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }

      &::after {
        content: close-quote;
        font-size: 1.5rem;
      }
    }
  }

  #doodle-nerd-cat {
    width: clamp(5.75rem, 10vw, 8rem);
  }
`;

const MainSection = () => {
  const { loading } = useContext(TaskListContext);

  return (
    <Main>
      <div id="quote">
        <p>Get it done. Period.</p>
        <img src={doodleNerdCat} alt="doodle nerd cat" id="doodle-nerd-cat" />
      </div>
      <TaskListContainer loading={loading} />
    </Main>
  );
};

export default MainSection;
