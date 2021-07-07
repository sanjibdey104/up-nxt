import React from "react";
import BacklogTasks from "./BacklogTasks";
import TodoTasks from "./TodoTasks";
import DoneTasks from "./DoneTasks";
import styled from "styled-components";
import OngoingTasks from "./OnGoingTasks";

const StyledTaskListContainer = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;

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

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    text-align: center;
  }
`;

const TaskListContainer = ({ tasks }) => {
  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <StyledTaskListContainer>
      <div className="task-status backlog-tasks">
        <h2 className="status">Backlog</h2>
        <BacklogTasks tasks={backlogTasks} />
      </div>

      <div className="task-status todo-tasks">
        <h2 className="status">Todo</h2>
        <TodoTasks tasks={todoTasks} />
      </div>

      <div className="task-status ongoing-tasks">
        <h2 className="status">Ongoing</h2>
        <OngoingTasks tasks={ongoingTasks} />
      </div>

      <div className="task-status done-tasks">
        <h2 className="status">Done</h2>
        <DoneTasks tasks={doneTasks} />
      </div>
    </StyledTaskListContainer>
  );
};

export default TaskListContainer;
