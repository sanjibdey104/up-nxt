import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase";
import { FaCheck } from "react-icons/fa";

const StyledSubtaskList = styled.ul`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.45rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #121212;
    border-radius: 1rem;
  }

  li {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    position: relative;
    padding-left: 1.2rem;
    font-size: 0.85rem;
    font-weight: 500;

    &#done {
      text-decoration: line-through;
      color: #4a4e69;
    }

    input[type="checkbox"] {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      height: 0.75rem;
      width: 0.75rem;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      left: 0;
      left: 0;
      top: 50%;
      transform: translateY(-50%);

      height: 0.85rem;
      width: 0.85rem;
      border-radius: 2px;
      border: 1px solid black;
      display: grid;
      place-content: center;

      svg {
        color: #121212;
        width: 1rem;
        transition: transform 150ms ease-in-out;
        transform: scale(0);
        transform-origin: bottom left;
      }
    }

    input:checked ~ .checkmark svg {
      transform: scale(1);
    }
  }
`;

const SubtaskList = ({ uid, taskKey, subtaskList, setSubtaskList }) => {
  const doneChecks = subtaskList.map((subtask) => subtask.isDone);

  //   const initialCheckboxArray = Array(subtasks.length).fill(false);
  const [checkboxArray, setCheckboxArray] = useState(doneChecks);

  const handleSubtaskCheck = (position) => {
    const updatedCheckboxArray = checkboxArray.map((checkbox, index) =>
      position === index ? !checkbox : checkbox
    );
    setCheckboxArray(updatedCheckboxArray);

    const subtaskListCopy = subtaskList.map((subtask, index) => ({
      ...subtask,
      isDone: updatedCheckboxArray[index],
    }));
    setSubtaskList(subtaskListCopy);

    db.collection(`users/${uid}/tasks`)
      .doc(taskKey)
      .update({ subtasks: subtaskListCopy });
  };

  return (
    <StyledSubtaskList>
      {subtaskList &&
        subtaskList.map((task, index) => (
          <li
            key={task?.id}
            className="subtask"
            id={checkboxArray[index] ? "done" : null}
          >
            <label id="subtask-label">
              {task.subtask}
              <input
                type="checkbox"
                name="subtask"
                id="subtask"
                value={task.subtask}
                checked={checkboxArray[index]}
                onChange={() => handleSubtaskCheck(index)}
              />
              <span className="checkmark">
                <FaCheck />
              </span>
            </label>
          </li>
        ))}
    </StyledSubtaskList>
  );
};

export default SubtaskList;
