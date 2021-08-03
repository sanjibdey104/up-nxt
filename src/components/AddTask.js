import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import db from "../firebase";
import SubtaskInputs from "./SubtaskInputs";
import { v4 as uuid } from "uuid";

const StyledTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  #task-input {
    width: 22rem;
    padding: 0.5rem 0.75rem;
    font-size: 1.1rem;
    margin-bottom: 1rem;

    border: 0;
    outline: 0;
    background-color: var(--accent-color);
    border-radius: 0.5rem;
    box-shadow: 3px 3px #000;
    transition: all 150ms ease-in-out;

    &::placeholder {
      color: inherit;
    }

    &:hover,
    &:focus {
      box-shadow: 1px 1px #000;
    }
  }

  .subtask-input-section {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    max-height: 0;
    overflow: hidden;
    transition: all 200ms ease-in-out;

    &#show {
      max-height: 20rem;
    }
  }

  #task-submit-btn {
    width: 10rem;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background-color: #121212;
    color: #f2f2f2;
    padding: 0.5rem;
    font-weight: bolder;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    span {
      font-size: 1rem;
    }
  }
`;

const AddTask = () => {
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const [taskInput, setTaskInput] = useState("");
  const initialSubtaskInputState = { id: uuid(), subtask: "", isDone: false };
  const [subtaskInputs, setSubtaskInputs] = useState([
    initialSubtaskInputState,
  ]);

  const createNewtask = (e) => {
    e.preventDefault();
    const newTask = {
      focus: taskInput,
      status: "todo",
      subtasks: subtaskInputs,
      createdAt: firebase.firestore.Timestamp.now(),
    };
    db.collection(`/users/${uid}/tasks`).add(newTask);
    setTaskInput("");
    setSubtaskInputs([initialSubtaskInputState]);
  };

  return (
    <StyledTaskForm onSubmit={createNewtask}>
      <input
        type="text"
        id="task-input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="enter a new task..."
      />

      <div className="subtask-input-section" id={taskInput ? "show" : null}>
        <p>got some sub tasks ?</p>
        <SubtaskInputs
          subtaskInputs={subtaskInputs}
          setSubtaskInputs={setSubtaskInputs}
        />
      </div>

      <button type="submit" id="task-submit-btn" onSubmit={createNewtask}>
        <span>+</span> Add Task
      </button>
    </StyledTaskForm>
  );
};

export default AddTask;
