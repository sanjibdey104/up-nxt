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
    height: 20rem;
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;

    input {
      width: 15rem;
      border: 0;
      /* border: 1px solid black; */
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
`;

const TaskEditingModal = ({
  visibility,
  setVisibility,
  focus,
  subtaskList,
}) => {
  const handleTaskFocusUpdate = () => {
    console.log("focus updated");
  };
  const handleSubtaskListUpdate = () => {
    console.log("list updated");
  };
  return (
    <StyledTaskEditingModal
      className={visibility ? "open" : ""}
      onClick={() => setVisibility(false)}
    >
      <section className="editing-section">
        <div className="task-focus">
          <p>Focus:</p>
          <input
            type="text"
            value={focus}
            onChange={() => handleTaskFocusUpdate()}
          />
        </div>
        <div className="subtask-list">
          <p>Subtasks:</p>
          <ul className="subtask-list">
            {subtaskList.map((subtask) => (
              <li key={subtask.id}>
                <input
                  type="text"
                  className="subtask"
                  value={subtask.subtask}
                  onChange={() => handleSubtaskListUpdate()}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </StyledTaskEditingModal>
  );
};

export default TaskEditingModal;
