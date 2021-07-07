import React, { useState } from "react";
import styled from "styled-components";
import db, { auth } from "../firebase";
import { FaCaretDown } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import firebase from "firebase/app";

const StyledNavbar = styled.nav`
  width: 90%;
  margin: 0 auto;
  height: 3rem;
  padding: 3rem 1rem;
  background-color: #ffffffda;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;

  #logo {
    font-size: 0.9rem;
    padding: 0.4rem;
    border-radius: 0.5rem;
    background-color: #e2cd6d;
    box-shadow: 2px 2px #000;
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
    width: 5.75rem;
    height: 3.2rem;
    border-radius: 0.75rem;
    box-shadow: var(--box-shadow);

    display: flex;
    align-items: center;
    justify-content: space-around;

    position: relative;
    background-color: #fff;

    #toggle-icon {
      font-size: 1.2rem;
      cursor: pointer;
    }
  }

  #profile-photo {
    width: 2.5rem;
    border-radius: 50%;
  }

  #sign-out-btn {
    width: 5rem;
    padding: 0.3rem;
    border-radius: 0.5rem;

    background-color: #ff6347da;
    border: 1px solid black;
    box-shadow: 2px 2px #000;

    position: absolute;
    bottom: -2.5rem;
    z-index: -1;
    transform: translateY(-150%);
    transition: transform 200ms ease-in-out;

    &.open {
      transform: translateY(0);
    }
  }
`;

const Navbar = ({ uid, photoSrc }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <p id="logo">UpNxt</p>

      <form className="task-input-form" onSubmit={(e) => createNewtask(e)}>
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
      </form>

      <section className="profile-info">
        <img src={photoSrc} alt="" id="profile-photo" />

        <FaCaretDown id="toggle-icon" onClick={() => setIsOpen(!isOpen)} />

        <button
          id="sign-out-btn"
          className={isOpen ? "open" : ""}
          onClick={() => auth.signOut()}
        >
          Sign-out
        </button>
      </section>
    </StyledNavbar>
  );
};

export default Navbar;
