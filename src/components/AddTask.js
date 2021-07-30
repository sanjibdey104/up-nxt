import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import db from "../firebase";

const StyledTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.2rem 0.75rem;
  border-radius: 0.5rem;

  #task-input {
    padding: 0.3rem 0.75rem;
    font-size: 1rem;
    flex-grow: 1;
    border: 1px solid black;
    background-color: inherit;
    border-radius: 0.5rem;

    &::placeholder {
      color: inherit;
    }
  }

  #task-submit-btn {
    width: 7rem;
    font-size: 0.75rem;
    border-radius: 0.5rem;
    background-color: #121212;
    color: #f2f2f2;
    padding: 0.75rem;
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
  const [task, setTask] = useState("");

  const createNewtask = (e) => {
    e.preventDefault();
    const newTask = {
      focus: task,
      status: "todo",
      createdAt: firebase.firestore.Timestamp.now(),
    };
    db.collection(`users/${uid}/tasks`).add(newTask);
    setTask("");
  };

  return (
    <StyledTaskForm onSubmit={(e) => createNewtask(e)}>
      <input
        type="text"
        id="task-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="add a new task..."
      />
      <button type="submit" id="task-submit-btn">
        <span>+</span> Add Task
      </button>
    </StyledTaskForm>
  );
};

export default AddTask;
