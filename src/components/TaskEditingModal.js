import React from "react";
import styled from "styled-components";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { v4 as uuid } from "uuid";
import db from "../firebase";

const StyledTaskEditingModal = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  place-content: center;
  position: absolute;
  inset: 0;

  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: all 200ms ease-in-out;

  &.open {
    opacity: 1;
    pointer-events: visible;
  }

  .subtask-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      #add-subtask-btn {
        font-size: 1.4rem;
      }
    }
  }

  .task-edit-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;
    padding: 0.5rem;

    input {
      width: 15rem;
      border: 0;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: var(--accent-color);
      font-weight: 500;
    }

    .task-focus,
    .subtasks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .subtask-manager {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .subtask-remove-btn,
  .subtask-add-btn {
    font-size: 1.5rem;
  }

  .update-submit-btn {
    background-color: #121212;
    color: #f2f2f2;
    width: 5rem;
    border-radius: 0.5rem;
    padding: 0.3rem;
    margin: 0 auto;
  }
`;

const TaskEditingModal = (props) => {
  const {
    uid,
    taskKey,
    task,
    visibility,
    setVisibility,
    focusValue,
    setFocusValue,
    subtaskList,
    setSubtaskList,
  } = props;

  const updateFocusValue = (e) => {
    setFocusValue(e.target.value);
  };

  const updateSubtaskValue = (e, position) => {
    let subtasks = [...subtaskList];
    subtasks[position].subtask = e.target.value;
    setSubtaskList(subtasks);
  };

  const addNewSubtask = () => {
    setSubtaskList([
      ...subtaskList,
      { id: uuid(), subtask: "", isDone: false },
    ]);
    // if (subtaskList.length) {
    // } else {
    //   setSubtaskList([{ id: uuid(), subtask: "", isDone: false }]);
    // }
  };

  const removeSubtask = (position) => {
    let updatedSubtaskList = [...subtaskList];
    updatedSubtaskList.splice(position, 1);
    setSubtaskList(updatedSubtaskList);
  };

  const updateTask = (e) => {
    e.preventDefault();
    db.collection(`users/${uid}/tasks`)
      .doc(taskKey)
      .set({
        ...task,
        focus: focusValue,
        subtasks: subtaskList,
      });
    setVisibility(false);
  };

  return (
    <StyledTaskEditingModal
      className={visibility ? "open" : ""}
      onClick={() => setVisibility(false)}
    >
      <form
        className="task-edit-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={() => updateTask()}
      >
        <div className="task-focus">
          <p>Focus:</p>
          <input
            type="text"
            value={focusValue}
            onChange={(e) => updateFocusValue(e)}
          />
        </div>
        <div className="subtasks">
          <p>Subtasks:</p>
          <ul className="subtask-list">
            {subtaskList &&
              subtaskList.map(({ id, subtask }, index) => (
                <div className="subtask-manager" key={id}>
                  <input
                    type="text"
                    name={subtask}
                    value={subtask}
                    placeholder="+ new subtask ?"
                    onChange={(e) => updateSubtaskValue(e, index)}
                  />
                  <button
                    type="button"
                    className="subtask-remove-btn"
                    onClick={() => removeSubtask(index)}
                  >
                    <MdRemoveCircle />
                  </button>
                  {subtaskList.length - 1 === index && (
                    <button
                      type="button"
                      className="subtask-add-btn"
                      onClick={() => addNewSubtask()}
                    >
                      <MdAddCircle />
                    </button>
                  )}
                </div>
              ))}
          </ul>
        </div>
        <button
          type="submit"
          className="update-submit-btn"
          onClick={(e) => updateTask(e)}
        >
          Update
        </button>
      </form>
    </StyledTaskEditingModal>
  );
};

export default TaskEditingModal;
