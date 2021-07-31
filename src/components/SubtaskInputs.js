import React from "react";
import styled from "styled-components";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { v4 as uuid } from "uuid";

const StyledSubtaskInputs = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  .subtask-manager {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  #subtask-input {
    width: 16rem;
    padding: 0.2rem 0.3rem;
    border: 0;
    outline: 0;

    font-size: 1rem;
    background-color: #f2f2f2;
    border: 1px solid #000;
    border-radius: 0.3rem;
    box-shadow: 2px 2px #000;
    transition: all 150ms ease-in-out;

    &:hover,
    &:focus {
      box-shadow: 1px 1px #000;
    }
  }

  #add-subtask-btn,
  #remove-subtask-btn {
    svg {
      font-size: 1.75rem;
    }
  }
`;

const SubtaskInputs = (props) => {
  const { subtaskInputs, setSubtaskInputs } = props;

  const handleSubtaskInput = (e, index) => {
    let inputs = [...subtaskInputs];
    inputs[index].subtask = e.target.value;
    setSubtaskInputs(inputs);
  };

  const addNewSubtaskInput = () => {
    setSubtaskInputs([...subtaskInputs, { id: uuid(), subtask: "" }]);
  };

  const removeSubtaskInput = (index) => {
    let updatedSubtaskInputs = [...subtaskInputs];
    updatedSubtaskInputs.splice(index, 1);
    setSubtaskInputs(updatedSubtaskInputs);
  };

  return (
    <StyledSubtaskInputs>
      {subtaskInputs &&
        subtaskInputs.map((subtaskInput, index) => (
          <div className="subtask-manager" key={subtaskInput.id}>
            <input
              type="text"
              id="subtask-input"
              placeholder="+ subtask"
              value={subtaskInput.subtask}
              onChange={(e) => handleSubtaskInput(e, index)}
            />
            <button
              id="add-subtask-btn"
              type="button"
              onClick={() => removeSubtaskInput(index)}
            >
              <MdRemoveCircle />
            </button>
            <button
              id="add-subtask-btn"
              type="button"
              onClick={() => addNewSubtaskInput()}
            >
              <MdAddCircle />
            </button>
          </div>
        ))}
    </StyledSubtaskInputs>
  );
};

export default SubtaskInputs;
