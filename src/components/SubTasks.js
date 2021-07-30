import React, { useState } from "react";
import styled from "styled-components";

const StyledSubTaskInputs = styled.section`
  width: 100%;
  height: 100px;
  padding: 0.5rem;

  #subtask {
    width: 100%;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    padding: 0.2rem 0.5rem;
    border: 0;
    background-color: var(--accent-color);
  }

  #subtask-input {
    background-color: inherit;
    padding: 0.2rem 0.3rem;
    border: 0;
    border-bottom: 1px solid black;
    width: 100%;
    font-size: 0.9rem;
  }
`;

const SubTasks = (props) => {
  const [subtaskInput, setSubtaskInput] = useState("");
  const { subtaskInputList, setSubtaskInputList } = props;

  const handleNewSubtaskInput = (e) => {
    if (e.code === "Enter") {
      let updatedSubtaskList = [...subtaskInputList];
      updatedSubtaskList.push({ id: Math.random(), subtask: subtaskInput });
      setSubtaskInputList(updatedSubtaskList);
      setSubtaskInput("");
    }
  };

  return (
    <StyledSubTaskInputs>
      <input
        id="subtask-input"
        type="text"
        placeholder="+ subtask"
        value={subtaskInput}
        onChange={(e) => setSubtaskInput(e.target.value)}
        onKeyDown={(e) => handleNewSubtaskInput(e)}
      />
      {subtaskInputList.length
        ? subtaskInputList.map((subtaskInput) => (
            <li key={subtaskInput.id}>{subtaskInput.subtask}</li>
          ))
        : null}
    </StyledSubTaskInputs>
  );
};

export default SubTasks;
