import React, { useState, useEffect } from "react";
import db from "../firebase";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import TaskList from "../components/TaskList";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex-grow: 1;
  padding: 1rem;

  .title {
    font-size: 1.75rem;
  }
`;

const SearchBar = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  border: 1px solid #adb5bd;
  border-radius: 0.75rem;
  background-color: white;
  width: 15rem;
  padding: 0 0.5rem;

  .search-input {
    padding: 0.3rem 0.85rem;
    border: 0;
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

      <h2 className="title">Tasks</h2>

      <section className="task-list-container">
        <TaskList tasks={tasks} loading={loading} />
      </section>
    </Main>
  );
};

export default MainSection;
