import React, { useState } from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const StyledTaskListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .task-status {
    min-height: 3.5rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: #e9ecef;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .status {
    font-size: 1.3rem;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    text-align: center;
  } */

  .task-status-list {
    height: 2rem;
    width: 100%;
    padding-bottom: 1rem;

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
      /* color: #6c757d; */
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
