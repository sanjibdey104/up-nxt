import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase";

const StyledSubtaskList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: black;

  li {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.85rem;
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
          <li key={task?.id} className="subtask">
            <input
              type="checkbox"
              name="subtask"
              id="subtask"
              value={task.subtask}
              checked={checkboxArray[index]}
              onChange={() => handleSubtaskCheck(index)}
            />
            <label id="subtask-label">{task.subtask}</label>
          </li>
        ))}
    </StyledSubtaskList>
  );
};

export default SubtaskList;
