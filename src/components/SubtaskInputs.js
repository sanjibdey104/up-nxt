import React from "react";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";

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
    justify-content: space-around;
  }

  #subtask-input {
    width: 18rem;
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
    setSubtaskInputs([...subtaskInputs, { subtask: "" }]);
  };

  return (
    <StyledSubtaskInputs>
      {subtaskInputs
        ? subtaskInputs.map((subtaskInput, index) => (
            <div className="subtask-manager" key={index}>
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
                onClick={() => addNewSubtaskInput()}
              >
                <MdAddCircle />
              </button>
            </div>
          ))
        : null}
    </StyledSubtaskInputs>
  );
};

export default SubtaskInputs;
