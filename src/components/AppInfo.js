import React, { useState } from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";

const StyledInfoSection = styled.section`
  width: 70%;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 600px) {
    width: 90%;
  }

  .toggle-info-btn {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    #info-icon {
      display: inline;
      width: 1.5rem;
    }
  }

  ul {
    font-size: 0.85rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 200ms ease-in-out;

    &#open {
      max-height: 20rem;
    }

    li {
      margin-bottom: 0.75rem;
      &::before {
        content: "#";
        height: 100%;
        width: 1rem;
        display: inline;
        margin-right: 0.5rem;
      }
    }
  }
`;

const AppInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledInfoSection>
      <button className="toggle-info-btn" onClick={() => setIsOpen(!isOpen)}>
        tap to know your way around <FiInfo id="info-icon" />
      </button>
      <ul className="manoeuvre-list" id={isOpen ? "open" : ""}>
        <li>hopefully, "add new task" is clear</li>
        <li>
          tap the card/edit button to edit, then tap the check mark to confirm
          ✅
        </li>
        <li>update the task status as you progress 🐢</li>
        <li>tasks are automatically moved to "Backlog" after 24 hours 🧐</li>
        <li>
          "Backlog" task status, when changed, gets updated with current date 📅
        </li>
        <li>
          to make you feel more responsible, a task can only be deleted once
          moved under "Done" 😎
        </li>
      </ul>
    </StyledInfoSection>
  );
};

export default AppInfo;
