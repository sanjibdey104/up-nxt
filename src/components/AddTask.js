import React, { forwardRef, useContext, useState } from "react";
import firebase from "firebase/app";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import db from "../firebase";
import { v4 as uuid } from "uuid";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubtaskListHandler from "./SubtaskListHandler";

const StyledTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

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

  .date-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .custom-date-picker {
    width: 8rem;
    padding: 0.3rem;
    border: 0;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    background-color: var(--accent-color);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .subtask-input-section {
    width: 100%;
    font-weight: 500;

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
  const initialSubtaskListState = { id: uuid(), subtask: "", isDone: false };
  const [subtaskList, setSubtaskList] = useState([initialSubtaskListState]);

  const currentDay = new Date();
  const [taskCompletionDate, setTaskCompletionDate] = useState(currentDay);

  const createNewtask = (e) => {
    e.preventDefault();
    let finalSubtaskList = subtaskList.filter((item) => item.subtask !== "");

    const newTask = {
      focus: taskInput,
      status: "todo",
      subtasks: finalSubtaskList,
      createdAt: firebase.firestore.Timestamp.now(),
      getDoneBy: taskCompletionDate,
    };
    db.collection(`/users/${uid}/tasks`).add(newTask);
    setTaskInput("");
    setSubtaskList([initialSubtaskListState]);
    setTaskCompletionDate(currentDay);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="custom-date-picker"
    >
      {value}
    </button>
  ));

  return (
    <StyledTaskForm onSubmit={createNewtask}>
      <input
        type="text"
        id="task-input"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="enter a new task..."
        required
      />

      <div className="date-picker">
        <p>Get it done by:</p>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          selected={taskCompletionDate}
          onChange={(date) => setTaskCompletionDate(date)}
          customInput={<ExampleCustomInput />}
        />
      </div>

      <div className="subtask-input-section" id={taskInput ? "show" : null}>
        <p>got some sub tasks ?</p>
        <SubtaskListHandler
          subtaskList={subtaskList}
          setSubtaskList={setSubtaskList}
          initialState={initialSubtaskListState}
          comp="fresh"
        />
      </div>

      <button type="submit" id="task-submit-btn" onSubmit={createNewtask}>
        <span>+</span> Add Task
      </button>
    </StyledTaskForm>
  );
};

export default AddTask;
