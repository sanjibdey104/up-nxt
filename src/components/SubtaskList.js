import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import db from "../firebase";

const StyledSubtaskList = styled.ul`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;

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

const SubtaskList = (props) => {
  const { uid, taskKey, subtaskList, setSubtaskList } = props;

  const handleSubtaskCheck = (subtaskId) => {
    const updatedSubtaskList = subtaskList.map((subtask) => {
      if (subtask.id === subtaskId)
        return { ...subtask, isDone: !subtask.isDone };
      else return subtask;
    });

    setSubtaskList(updatedSubtaskList);

    db.collection(`users/${uid}/tasks`)
      .doc(taskKey)
      .update({ subtasks: updatedSubtaskList });
  };

  return (
    <StyledSubtaskList>
      {subtaskList &&
        subtaskList.map(({ id, subtask, isDone }) => (
          <li key={id} className="subtask" id={isDone ? "done" : null}>
            <label>
              {subtask}
              <input
                type="checkbox"
                id="subtask"
                value={subtask}
                checked={isDone}
                onChange={() => handleSubtaskCheck(id)}
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
