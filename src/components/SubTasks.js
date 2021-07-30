import React from "react";
import styled from "styled-components";

const StyledSubTasksList = styled.ul`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  padding: 0.5rem;
`;

const SubTasks = () => {
  return (
    <StyledSubTasksList>
      <li>some item</li>
      <li>another one</li>
    </StyledSubTasksList>
  );
};

export default SubTasks;
