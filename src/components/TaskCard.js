import React, { useState, useRef } from "react";
import styled from "styled-components";
import db from "../firebase";
import { MdModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const StyledTaskCard = styled.li`
  width: 12rem;
  height: 12rem;
  border-radius: 0.85rem;
  padding: 0.75rem;
  background-color: #e9c46a;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .task-focus {
    width: 100%;
    height: auto;
    background-color: inherit;
    border: 0;
    outline: 0;
    font-size: 0.9rem;

    resize: none;
  }

  &#todo {
    background-color: #d9ed92;
    background-color: #abc4ff;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-edit-btn {
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 0.75rem;
    background-color: #000;
    color: #ffffffda;
  }

  .task-update-btn {
    display: none;

    &.show {
      display: block;
    }
  }
`;

const TaskCard = ({ task }) => {
  const { key } = task;
  const [focusValue, setFocusValue] = useState(task.focus);
  const [inputFocusState, setInputFocusState] = useState(false);
  const inputRef = useRef();

  const updateTask = () => {
    db.collection("tasks").doc(key).update({ focus: focusValue });
    setInputFocusState(false);
  };

  const focusTaskField = () => {
    inputRef.current.focus();
  };

  return (
    <StyledTaskCard id={task.status}>
      <textarea
        ref={inputRef}
        name="focus"
        rows="10"
        className="task-focus"
        value={focusValue}
        onChange={(e) => setFocusValue(e.target.value)}
        onFocus={(e) => {
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          );
          setInputFocusState(true);
        }}
      />

      <section className="footer">
        <p>{task.status}</p>

        <button className="task-edit-btn">
          {inputFocusState ? (
            <FaCheck id="update-icon" onClick={() => updateTask()} />
          ) : (
            <MdModeEdit onClick={() => focusTaskField()} />
          )}
        </button>
      </section>
    </StyledTaskCard>
  );
};

export default TaskCard;
