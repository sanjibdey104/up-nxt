import React, { useState } from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const StyledTaskListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .task-status-list {
    height: 2rem;
    width: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;

    li {
      font-size: 0.9rem;
      padding: 0.3rem;
      cursor: pointer;
      border-radius: 0.5rem;
    }

    li.active {
      background-color: #efa135;
    }
  }
`;

const TaskListContainer = ({ tasks }) => {
  const [indexValue, setIndexValue] = useState(0);
  const [activeStatus, setActiveStatus] = useState("todo");
  const taskStatus = ["todo", "backlog", "ongoing", "done"];

  const handleStatus = (index, status) => {
    setIndexValue(index);
    setActiveStatus(status);
  };

  const filteredTasks = tasks.filter((task) => task.status === activeStatus);

  return (
    <StyledTaskListContainer>
      <h2>All the Tasks</h2>
      <ul className="task-status-list">
        {taskStatus.map((status, index) => (
          <li
            key={status}
            onClick={() => handleStatus(index, status)}
            className={indexValue === index ? "active" : ""}
          >
            {status}
          </li>
        ))}
      </ul>
      <TaskList tasks={filteredTasks} />
    </StyledTaskListContainer>
  );
};

export default TaskListContainer;
