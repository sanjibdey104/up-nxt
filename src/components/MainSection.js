import React, { useState, useEffect } from "react";
import db from "../firebase";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import TaskList from "../components/TaskList";
import TodoTasks from "./TodoTasks";
import OnGoingTasks from "./OnGoingTasks";
import DoneTasks from "./DoneTasks";

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

const TaskListContainer = styled.section`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      margin-bottom: 1rem;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
      }
    }
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

  // filter data as per status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <Main>
      <SearchBar>
        <FiSearch id="search-icon" />
        <input type="text" className="search-input" placeholder="search" />
      </SearchBar>

      <TaskListContainer>
        <div className="task-list todo-task-list">
          {/* <TaskList tasks={tasks} loading={loading} /> */}
          <h2>ToDo</h2>
          <TodoTasks todoTasks={todoTasks} />
        </div>
        <div className="task-list ongoing-task-list">
          <h2>Ongoing</h2>
          <OnGoingTasks ongoingTasks={ongoingTasks} />
        </div>
        <div className="task-list done-task-list">
          <h2>Done</h2>
          <DoneTasks doneTasks={doneTasks} />
        </div>
      </TaskListContainer>
    </Main>
  );
};

export default MainSection;
