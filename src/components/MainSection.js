import React, { useState, useEffect } from "react";
import db from "../firebase";
import styled from "styled-components";
import TaskListContainer from "./TaskListContainer";
import { FiSearch } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    setLoading(true);
    db.collection("tasks").onSnapshot((querySnapshot) => {
      let arr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setTasks(arr);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Main>
      <SearchBar>
        <FiSearch id="search-icon" />
        <input type="text" className="search-input" placeholder="search" />
      </SearchBar>

      <TaskListContainer tasks={tasks} loading={loading} />
    </Main>
  );
};

export default MainSection;
