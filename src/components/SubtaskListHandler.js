import React from "react";
import styled from "styled-components";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { v4 as uuid } from "uuid";

const StyledSubtaskListHandler = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .subtask-manager {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .subtask-input {
    min-width: 16rem;
    padding: 0.2rem 0.3rem;
    border: 0;
    outline: 0;

    font-size: 1rem;
    border-radius: 0.5rem;
    background-color: #f2f2f2;
    border: 1px solid #000;
    box-shadow: 2px 2px #000;
    transition: all 150ms ease-in-out;

    &:hover,
    &:focus {
      box-shadow: 1px 1px #000;
    }
  }

  .add-subtask-btn,
  .remove-subtask-btn {
    svg {
      font-size: 1.5rem;
    }
  }
`;

const SubtaskListHandler = (props) => {
  const { subtaskList, setSubtaskList, initialState, comp } = props;

  const handleSubtaskValue = (e, position) => {
    let subtasks = [...subtaskList];
    subtasks[position].subtask = e.target.value;
    setSubtaskList(subtasks);
  };

  const addNewSubtask = () => {
    setSubtaskList([
      ...subtaskList,
      { id: uuid(), subtask: "", isDone: false },
    ]);
  };

  const removeSubtask = (position) => {
    let subtasksAfterDeletion = [...subtaskList];
    subtasksAfterDeletion.length === 1
      ? comp === "fresh"
        ? (subtasksAfterDeletion = [initialState])
        : (subtasksAfterDeletion = [{ id: uuid(), subtask: "", isDone: false }])
      : subtasksAfterDeletion.splice(position, 1);
    setSubtaskList(subtasksAfterDeletion);
  };

  return (
    <StyledSubtaskListHandler>
      {subtaskList.map(({ id, subtask }, index) => (
        <div className="subtask-manager" key={id}>
          <input
            type="text"
            className="subtask-input"
            placeholder="+ new subtask"
            value={subtask}
            onChange={(e) => handleSubtaskValue(e, index)}
          />
          <button
            className="remove-subtask-btn"
            type="button"
            onClick={() => removeSubtask(index)}
          >
            <MdRemoveCircle />
          </button>
          {subtaskList.length - 1 === index && (
            <button
              className="add-subtask-btn"
              type="button"
              onClick={() => addNewSubtask()}
            >
              <MdAddCircle />
            </button>
          )}
        </div>
      ))}
    </StyledSubtaskListHandler>
  );
};

export default SubtaskListHandler;
