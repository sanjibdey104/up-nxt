import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase";

const StyledTaskCard = styled.li`
  width: 12rem;
  height: 12rem;
  border-radius: 0.85rem;
  padding: 0.85rem;
  background-color: #e9c46a;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .task-focus {
    background-color: inherit;
    border: 0;
    outline: 0;
    font-size: 1rem;
  }

  &#todo {
    background-color: #d9ed92;
  }
`;

const TaskCard = ({ task }) => {
  const { key } = task;
  const [focus, setFocus] = useState(task.focus);

  const updateTask = () => {
    db.collection("tasks")
      .doc(key)
      .set({ ...task, focus });
  };

  return (
    <StyledTaskCard id={task.status}>
      <input
        type="text"
        value={focus}
        className="task-focus"
        onChange={(e) => setFocus(e.target.value)}
      />
      <button onClick={() => updateTask()}>Update</button>

      <p>{task.status}</p>
    </StyledTaskCard>
  );
};

export default TaskCard;
