import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import db from "../firebase";
import { AuthContext } from "../Auth";
import dayjs from "dayjs";
import styled from "styled-components";
import SubtaskList from "./SubtaskList";
import TaskEditingModal from "./TaskEditingModal";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";

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

  .dates {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* gap: 0.5rem; */
    font-size: 0.75rem;

    span {
      font-weight: 600;
      font-size: 0.75rem;
    }
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
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser;
  const { key, status, focus, createdAt, getDoneBy, subtasks } = task;

  const dt = new Date(createdAt.toDate());
  const taskCreationDate = dayjs(dt).format("MMM DD");
  const gdt = new Date(getDoneBy.toDate());
  const closeBy = dayjs(gdt).format("MMM DD");

  // format the task creation and closing date
  const curDate = new Date();
  const epochSeconds =
    (curDate.getTime() - createdAt.toDate().getTime()) / 1000;
  const hoursSinceCreation = Math.round(epochSeconds / 3600);

  if (status === "todo" && hoursSinceCreation > 24) {
    moveToBacklogTasks();
  }

  // logic to automatically move tasks to "backlog" when it crosses 24hour threshold
  const moveToBacklogTasks = () => {
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({ ...task, status: "backlog" });
  };

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

  const [modalVisibility, setModalVisibility] = useState(false);
  const [focusValue, setFocusValue] = useState(focus);
  let [subtaskList, setSubtaskList] = useState(subtasks);

  const updateTask = (e) => {
    e.preventDefault();
    let finalSubtaskList = subtaskList.filter((item) => item.subtask !== "");
    db.collection(`users/${uid}/tasks`)
      .doc(key)
      .set({
        ...task,
        focus: focusValue,
        subtasks: finalSubtaskList,
      });
    setModalVisibility(false);
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
            <MdModeEdit onClick={() => setModalVisibility(true)} />
          </button>
        )}
      </div>
      <TaskEditingModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        task={task}
        focusValue={focusValue}
        setFocusValue={setFocusValue}
        subtaskList={
          subtaskList.length
            ? subtaskList
            : [{ id: uuid(), subtask: "", isDone: false }]
        }
        setSubtaskList={setSubtaskList}
        updateTask={updateTask}
      />
      <div className="subtasks">
        <SubtaskList
          uid={uid}
          taskKey={key}
          subtaskList={subtaskList ? subtaskList : []}
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

        <div className="dates">
          <p>
            created on: <span>{taskCreationDate}</span>
          </p>
          <p>
            get done by: <span>{closeBy}</span>
          </p>
        </div>
      </div>
    </StyledTaskCard>
  );
};

export default TaskCard;
