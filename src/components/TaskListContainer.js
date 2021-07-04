import React from "react";
import styled from "styled-components";
import BacklogTasks from "./BacklogTasks";
import DoneTasks from "./DoneTasks";
import OnGoingTasks from "./OnGoingTasks";
import TodoTasks from "./TodoTasks";

const StyledTaskListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .task-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 0;
    background-color: #f5f3f4;
    border-radius: 0.75rem;

    h2 {
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;

      @media (max-width: 900px) {
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
`;

const TaskListContainer = () => {
  return (
    <StyledTaskListContainer>
      <div className="task-list backlog-task-list">
        <h2>Backlog</h2>
        <BacklogTasks />
      </div>
      <div className="task-list todo-task-list">
        <h2>ToDo</h2>
        <TodoTasks />
      </div>
      <div className="task-list ongoing-task-list">
        <h2>Ongoing</h2>
        <OnGoingTasks />
      </div>
      <div className="task-list done-task-list">
        <h2>Done</h2>
        <DoneTasks />
      </div>
    </StyledTaskListContainer>
  );
};

export default TaskListContainer;
