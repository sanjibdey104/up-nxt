import React, { useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import db from "../firebase";

const SidebarSection = styled.section`
  width: 100%;
  justify-content: space-around;
  z-index: 5;

  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0;
  background-color: #61a5c2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  position: fixed;
  top: 0;

  .create-task-wrapper {
    width: 18rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .create-task {
    width: 100%;
    height: 100%;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2), inset 0 0 3px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    padding: 5px;
    background: linear-gradient(to right, #caf0f8, #90e0ef);

    display: flex;
    align-items: center;
    position: relative;

    &:hover,
    &:focus {
      outline: 0;
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    }
  }

  .create-task_input {
    font-size: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 90%;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    border: 0;
    color: black;
    background-color: transparent;

    &::placeholder {
      font-size: 0.9rem;
      color: #333;
    }

    &:hover,
    &:focus {
      outline: 0;
    }
  }

  .create-task_btn {
    background-color: black;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;

    width: 2rem;
    height: 2rem;
    display: grid;
    place-content: center;
    border-radius: 50%;
    margin-left: auto;
    z-index: 2;
  }

  .logo {
    p {
      font-weight: 600;
      color: #000;
      padding: 0.45rem;
    }
  }
`;

const Sidebar = () => {
  const [task, setTask] = useState("");

  const createNewTask = () => {
    let newTask = { focus: task, status: "todo" };
    db.collection("tasks").add(newTask);
    setTask("");
  };

  return (
    <SidebarSection>
      <header className="logo">
        <p>UpNxt</p>
      </header>

      <div className="create-task-wrapper">
        <div className="create-task">
          <input
            type="text"
            className="create-task_input"
            placeholder="new task?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="create-task_btn" onClick={() => createNewTask()}>
            <FiPlus />
          </button>
        </div>
      </div>
    </SidebarSection>
  );
};

export default Sidebar;
