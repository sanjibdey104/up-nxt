import React from "react";
import styled from "styled-components";
import BacklogTasks from "./BacklogTasks";
import DoneTasks from "./DoneTasks";
import OnGoingTasks from "./OnGoingTasks";
import TodoTasks from "./TodoTasks";

const StyledTaskListContainer = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 4rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 0.85fr));

  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      width: clamp(260px, 40vw, 270px);
      margin: 0 auto;

      background-color: #e9ecef;
      border-radius: 0.75rem;
      border: 1px solid black;
    }

    h2 {
      margin-bottom: 2rem;
      font-size: 1.2rem;
      z-index: 1;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      z-index: 1;
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
