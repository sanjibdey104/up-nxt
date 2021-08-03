import React from "react";
import styled from "styled-components";

const StyledTaskEditingModal = styled.div`
  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: all 200ms ease-in-out;

  &.open {
    opacity: 1;
    pointer-events: visible;
  }

  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  display: grid;
  place-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .editing-section {
    width: 100%;
    padding: 1rem;
    height: 22rem;
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;

    input {
      width: 15rem;
      border: 0;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: inherit;
      background-color: var(--accent-color);
    }
    p {
      margin-bottom: 0.5rem;
    }

    .subtask-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  #submit-update-btn {
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
    visibility,
    setVisibility,
    focusValue,
    setFocusValue,
    subtaskListCopy,
    setSubtaskListCopy,
    updateSubtaskList,
  } = props;

  const updateFocusValue = (e) => {
    setFocusValue(e.target.value);
  };
  const updateSubtaskValue = (e, position) => {
    let subtasks = [...subtaskListCopy];
    subtasks[position].subtask = e.target.value;
    setSubtaskListCopy(subtasks);
  };

  return (
    <StyledTaskEditingModal
      className={visibility ? "open" : ""}
      onClick={() => setVisibility(false)}
    >
      <section className="editing-section" onClick={(e) => e.stopPropagation()}>
        <div className="task-focus">
          <p>Focus:</p>
          <input
            type="text"
            value={focusValue}
            onChange={(e) => updateFocusValue(e)}
          />
        </div>
        <div className="subtask-list">
          <p>Subtasks:</p>
          <ul className="subtask-list">
            {subtaskListCopy.map((subtask, index) => (
              <li key={subtask.id}>
                <input
                  type="text"
                  className="subtask"
                  value={subtask.subtask}
                  onChange={(e) => updateSubtaskValue(e, index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          id="submit-update-btn"
          onClick={() => updateSubtaskList()}
        >
          Update
        </button>
      </section>
    </StyledTaskEditingModal>
  );
};

export default TaskEditingModal;
