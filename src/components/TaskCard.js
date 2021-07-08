import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Auth";
import db from "../firebase";
import { FaCheck } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { DateContext } from "../context/DateContext";
import firebase from "firebase/app";

const StyledTaskCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  height: 8rem;
  width: 18rem;
  padding: 0.5rem;
  box-shadow: 3px 3px #000;
  border-radius: 0.5rem;

  &#todo {
    background-color: #abc4ff;
  }
  &#ongoing {
    background-color: #e9c46a;
  }
  &#done {
    background-color: #95d5b2;
  }
  &#backlog {
    background-color: #ffb3c1;
  }

  #task-focus {
    background-color: inherit;
    border: 0;
    width: 100%;
    resize: none;
    font-size: 1.1rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #task-status-options {
    background-color: inherit;
    border: 0;
    option {
      background-color: inherit;
    }
  }

  #date {
    font-size: 0.85rem;
    font-weight: bolder;
  }

  #task-edit-btn,
  #task-delete-btn {
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    padding: 0.4rem;
  }
`;

const TaskCard = ({ task }) => {
  const { status, focus, createdAt, key } = task;
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const inputRef = useRef();

  let { currentTimestamp } = useContext(DateContext);

  const moveToOngoingTasks = () => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({ ...task, status: "backlog" });
  };

  if (currentTimestamp) {
    let seconds = currentTimestamp.seconds - createdAt.seconds;
    let hoursPassed = Math.floor(seconds / 3600);
    if (hoursPassed > 20) {
      moveToOngoingTasks();
    }
  }

  const [focusValue, setFocusValue] = useState(focus);
  const [inputFocusState, setInputFocusState] = useState(false);

  const taskDate = new Date(createdAt.toDate());
  const taskCreationDate = taskDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const statusOptions = ["todo", "ongoing", "done", "backlog"];

  const updateTaskStatus = (e) => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .update({ status: e.target.value });
  };

  const updateBacklogStatus = (e) => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({
        ...task,
        createdAt: firebase.firestore.Timestamp.now(),
        status: e.target.value,
      });
  };

  const focusTaskField = () => {
    inputRef.current.focus();
    setInputFocusState(true);
  };

  const updateTask = () => {
    db.collection(`users/${uid}/tasks`).doc(key).update({ focus: focusValue });
    setInputFocusState(false);
  };

  const deleteTask = () => {
    db.collection(`users/${uid}/tasks`).doc(key).delete();
  };

  return (
    <StyledTaskCard id={status}>
      <div className="card-main">
        <textarea
          ref={inputRef}
          name="task-focus"
          id="task-focus"
          cols="30"
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
      </div>
      <div className="card-footer">
        <select
          name="task-status-options"
          id="task-status-options"
          value={status}
          onChange={
            status !== "backlog"
              ? (e) => updateTaskStatus(e)
              : (e) => updateBacklogStatus(e)
          }
        >
          {statusOptions.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>

        <p id="date">{taskCreationDate}</p>

        {status === "done" ? (
          <button id="task-delete-btn">
            <MdDelete onClick={() => deleteTask()} />
          </button>
        ) : (
          <button id="task-edit-btn">
            {inputFocusState ? (
              <FaCheck id="update-icon" onClick={() => updateTask()} />
            ) : (
              <MdModeEdit onClick={() => focusTaskField()} />
            )}
          </button>
        )}
      </div>
    </StyledTaskCard>
  );
};

export default TaskCard;
