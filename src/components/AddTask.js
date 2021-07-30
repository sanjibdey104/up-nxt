import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import db from "../firebase";
import SubTasks from "./SubTasks";

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

    border: 1px solid black;
    background-color: inherit;
    border-radius: 0.5rem;

    &::placeholder {
      color: inherit;
    }
  }

  .subtasks-input-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    max-height: 0;
    overflow: hidden;
    transition: all 200ms ease-in-out;

    &#show {
      max-height: 10rem;
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

  const createNewtask = (e) => {
    e.preventDefault();
    const newTask = {
      focus: taskInput,
      status: "todo",
      createdAt: firebase.firestore.Timestamp.now(),
    };
    db.collection(`/users/${uid}/tasks`).add(newTask);
    setTaskInput("");
  };

  return (
    <StyledTaskForm onSubmit={(e) => createNewtask(e)}>
      <input
        type="text"
        id="task-input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="enter a new task..."
      />

      <div
        className="subtasks-input-section"
        id={taskInput.length ? "show" : null}
      >
        <p>got some sub tasks ?</p>
        <SubTasks />
      </div>

      <button type="submit" id="task-submit-btn">
        <span>+</span> Add Task
      </button>
    </StyledTaskForm>
  );
};

export default AddTask;
