import React, { useContext } from "react";
import styled from "styled-components";
import TaskListContainer from "./TaskListContainer";
import { FiSearch } from "react-icons/fi";
import { TaskListContext } from "../context/TaskListContext";

const Main = styled.main`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  margin-left: 18%;
`;

const SearchBar = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 0.75rem;
  background-color: white;
  width: 20rem;

  .search-input {
    font-size: 1rem;
    padding: 0.3rem 0.85rem;
    border: 0;
    outline: 0;
    font-weight: 500;
  }
`;

const MainSection = () => {
  const { loading } = useContext(TaskListContext);

  return (
    <Main>
      <SearchBar>
        <FiSearch id="search-icon" />
        <input type="text" className="search-input" placeholder="search" />
      </SearchBar>

      <TaskListContainer loading={loading} />
    </Main>
  );
};

export default MainSection;
