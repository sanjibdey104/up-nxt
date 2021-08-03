import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import db from "../firebase";
import { AuthContext } from "../Auth";
import { DateContext } from "../context/DateContext";
import { MdModeEdit, MdDelete } from "react-icons/md";
import styled from "styled-components";
import SubtaskList from "./SubtaskList";
import TaskEditingModal from "./TaskEditingModal";

const StyledTaskCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  flex-shrink: 0;

  min-height: 12rem;
  width: 18rem;
  padding: 0.85rem;
  border-radius: 0.85rem;
  background-color: var(--accent-color);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  &#todo {
    background-color: #a2d2ff;
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

  .card-header {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: flex-start;
  }

  #task-focus {
    font-size: 1rem;
    font-weight: 500;
    flex-grow: 1;
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
    cursor: pointer;
  }
`;

const TaskCard = ({ task }) => {
  const { status, focus, createdAt, key, subtasks } = task;
  const [subtaskList, setSubtaskList] = useState(subtasks);
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  let { currentTimestamp } = useContext(DateContext);

  // format the task creation display date
  const taskDate = new Date(createdAt.toDate());
  const taskCreationDate = taskDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  // logic to automatically move tasks to "backlog" when it crosses 24hour threshold
  const moveToOngoingTasks = () => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({ ...task, status: "backlog" });
  };

  if (currentTimestamp) {
    let seconds = currentTimestamp.seconds - createdAt.seconds;
    let hoursPassed = Math.floor(seconds / 3600);
    if (status === "todo" && hoursPassed > 24) {
      moveToOngoingTasks();
    }
  }

  // handle task status
  const statusOptions = ["todo", "ongoing", "done", "backlog"];
  const updateTaskStatus = (e) => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .update({ status: e.target.value });
  };

  // handle status of backlog tasks
  const updateBacklogStatus = (e) => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({
        ...task,
        createdAt: firebase.firestore.Timestamp.now(),
        status: e.target.value,
      });
  };

  // to delete a speicific task
  const deleteTask = () => {
    db.collection(`users/${uid}/tasks`).doc(key).delete();
  };

  const [editingModalVisibility, setEditingModalVisibility] = useState(false);
  const [focusValue, setFocusValue] = useState(focus);
  const [subtaskListCopy, setSubtaskListCopy] = useState(subtaskList);

  const updateSubtaskList = () => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({ ...task, subtasks: subtaskListCopy });
    setEditingModalVisibility(false);
  };

  return (
    <StyledTaskCard id={status}>
      <div className="card-header">
        <p id="task-focus">{focus}</p>
        {status === "done" ? (
          <button id="task-delete-btn">
            <MdDelete onClick={() => deleteTask()} />
          </button>
        ) : (
          <button id="task-edit-btn">
            <MdModeEdit onClick={() => setEditingModalVisibility(true)} />
          </button>
        )}
      </div>
      <TaskEditingModal
        setVisibility={setEditingModalVisibility}
        modalVisibility={editingModalVisibility}
        visibility={editingModalVisibility}
        focusValue={focusValue}
        setFocusValue={setFocusValue}
        subtaskListCopy={subtaskListCopy}
        setSubtaskListCopy={setSubtaskListCopy}
        updateSubtaskList={updateSubtaskList}
      />
      <div className="subtasks">
        <SubtaskList
          uid={uid}
          taskKey={key}
          subtaskList={subtaskList}
          setSubtaskList={setSubtaskList}
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
      </div>
    </StyledTaskCard>
  );
};

export default TaskCard;
