import React from "react";
import styled from "styled-components";
import DoneTasks from "./DoneTasks";
import OnGoingTasks from "./OnGoingTasks";
import TodoTasks from "./TodoTasks";

const StyledTaskListContainer = styled.section`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      margin-bottom: 1rem;
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
`;

const TaskListContainer = ({ tasks, loading }) => {
  // filter data as per status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <StyledTaskListContainer>
      <div className="task-list todo-task-list">
        <h2>ToDo</h2>
        <TodoTasks todoTasks={todoTasks} />
      </div>
      <div className="task-list ongoing-task-list">
        <h2>Ongoing</h2>
        <OnGoingTasks ongoingTasks={ongoingTasks} />
      </div>
      <div className="task-list done-task-list">
        <h2>Done</h2>
        <DoneTasks doneTasks={doneTasks} />
      </div>
    </StyledTaskListContainer>
  );
};

export default TaskListContainer;
