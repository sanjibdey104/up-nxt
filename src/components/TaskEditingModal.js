import React from "react";
import styled from "styled-components";
import SubtaskListHandler from "./SubtaskListHandler";

const StyledTaskEditingModal = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
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

  .task-edit-form {
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .task-focus {
      input {
        border: 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: var(--accent-color);
        font-weight: 500;
      }
    }
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
    focusValue,
    setFocusValue,
    subtaskList,
    setSubtaskList,
    updateTask,
    modalVisibility,
    setModalVisibility,
  } = props;

  const updateFocusValue = (e) => {
    setFocusValue(e.target.value);
  };

  return (
    <StyledTaskEditingModal
      className={modalVisibility ? "open" : ""}
      onClick={() => setModalVisibility(false)}
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
            className="task-focus"
            value={focusValue}
            onChange={(e) => updateFocusValue(e)}
          />
        </div>
        <div className="subtasks">
          <p>Subtasks:</p>
          <SubtaskListHandler
            subtaskList={subtaskList}
            setSubtaskList={setSubtaskList}
            comp="update"
          />
        </div>
        <button
          type="submit"
          className="update-submit-btn"
          onClick={(e) => updateTask(e)}
          disabled={focusValue === ""}
        >
          Update
        </button>
      </form>
    </StyledTaskEditingModal>
  );
};

export default TaskEditingModal;
