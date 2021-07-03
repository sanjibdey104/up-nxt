import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

const SidebarSection = styled.section`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0;
  box-shadow: 3px 0 3px rgba(0, 0, 0, 0.2);

  position: fixed;
  left: 0;

  .create-note-btn {
    background-color: black;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 50%;
  }

  .logo {
    p {
      font-size: 0.85rem;
      font-weight: 500;
      color: #000;
      padding: 0.45rem;
    }
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
