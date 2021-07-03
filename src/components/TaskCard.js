import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase";

const StyledTaskCard = styled.li`
  width: 12rem;
  height: 12rem;
  border-radius: 0.85rem;
  padding: 0.85rem;
  background-color: #e9c46a;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .task-focus {
    width: 100%;
    height: auto;
    background-color: inherit;
    border: 0;
    outline: 0;
    font-size: 0.9rem;

    resize: none;
  }

  &#todo {
    background-color: #d9ed92;
    background-color: #abc4ff;
  }
`;

const TaskCard = ({ task }) => {
  const { key } = task;
  const [focus, setFocus] = useState(task.focus);

  const updateTask = () => {
    db.collection("tasks").doc(key).update({ focus: focus });
  };

  return (
    <StyledTaskCard id={task.status}>
      <textarea
        name="focus"
        id="focus"
        cols="30"
        rows="10"
        className="task-focus"
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
      />

      <button onClick={() => updateTask()}>Update</button>

      <p>{task.status}</p>
    </StyledTaskCard>
  );
};

export default TaskCard;
