import React, { useState } from "react";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { FaCaretDown } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import firebase from "firebase/app";
import Logo from "./Logo";

const StyledNavbar = styled.nav`
  width: 90%;
  margin: 0 auto;
  height: 3rem;
  padding: 2rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  #logo {
    position: static;
  }

  .task-input-form {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(to right, #ffba08, #faa307da);

    border: 1px solid #1212121d;
    padding: 0.2rem 0.75rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow);
    z-index: 10;

    @media (max-width: 600px) {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  #task-input {
    padding: 0.3rem 0.75rem;
    font-size: 1rem;
    width: 15rem;
    border: 0;
    background-color: inherit;

    &::placeholder {
      color: inherit;
    }
  }

  #task-submit-btn {
    font-size: 1.5rem;
  }

  .profile-info {
    width: 5rem;
    height: 3rem;
    border-radius: 0.75rem;
    box-shadow: var(--box-shadow);

    border: 1px solid #efefef;
    box-shadow: 3px 3px #efa135;

    display: flex;
    align-items: center;
    justify-content: space-around;

    position: relative;
    background-color: #f8f9fa;

    #toggle-icon {
      font-size: 1.2rem;
      cursor: pointer;
    }
  }

  #profile-photo {
    width: 2.3rem;
    border-radius: 50%;
  }

  #sign-out-btn {
    width: 5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;

    font-size: 0.75rem;
    font-weight: 500;
    background-color: #efa135;
    box-shadow: 5px 5px #000;
    transition: all 200ms ease-in-out;

    &:hover {
      box-shadow: 3px 3px #000;
    }
  }
`;

const Navbar = ({ uid }) => {
  const [task, setTask] = useState("");

  const createNewtask = (e) => {
    e.preventDefault();
    const newTask = {
      focus: task,
      status: "todo",
      createdAt: firebase.firestore.Timestamp.now(),
    };
    db.collection(`users/${uid}/tasks`).add(newTask);
    setTask("");
  };

  return (
    <StyledNavbar>
      <Logo />

      {/* <form className="task-input-form" onSubmit={(e) => createNewtask(e)}>
        <input
          type="text"
          id="task-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="add a new task..."
        />
        <button type="submit" id="task-submit-btn">
          <FiPlusCircle />
        </button>
      </form> */}

      {/* <section className="profile-info">
        <img src={photoSrc} alt="" id="profile-photo" />

        <FaCaretDown id="toggle-icon" onClick={() => setIsOpen(!isOpen)} />

      </section> */}
      <button
        id="sign-out-btn"
        // className={isOpen ? "open" : ""}
        onClick={() => auth.signOut()}
      >
        Sign-out
      </button>
    </StyledNavbar>
  );
};

export default Navbar;
