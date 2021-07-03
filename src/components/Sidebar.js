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
  border-right: 1px solid #a5a5a5;

  position: fixed;
  left: 5%;

  .create-note-btn {
    background-color: black;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    width: 2rem;
    border-radius: 50%;
  }

  .logo {
    p {
      font-weight: 600;
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
