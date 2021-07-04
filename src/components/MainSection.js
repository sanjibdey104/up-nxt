import React, { useContext } from "react";
import styled from "styled-components";
import TaskListContainer from "./TaskListContainer";
import { TaskListContext } from "../context/TaskListContext";

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
`;

const MainSection = () => {
  const { loading } = useContext(TaskListContext);

  return (
    <Main>
      <TaskListContainer loading={loading} />
    </Main>
  );
};

export default MainSection;
