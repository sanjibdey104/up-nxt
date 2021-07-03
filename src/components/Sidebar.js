import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

const SidebarSection = styled.section`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0;

  header {
    font-weight: 600;
  }

  .create-note-btn {
    background-color: black;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 50%;
  }
`;

const Sidebar = () => {
  return (
    <SidebarSection>
      <header className="logo">
        <p>UpNxt</p>
      </header>

      <button className="create-note-btn">
        <FiPlus />
      </button>
    </SidebarSection>
  );
};

export default Sidebar;
