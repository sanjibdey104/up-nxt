import React, { useContext } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";
import styled from "styled-components";
import Logo from "./Logo";

const SignInPage = styled.section`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  position: relative;
  background-color: #efefef;

  h2 {
    font-size: 1.85rem;
  }

  p {
    width: 12rem;
    text-align: center;
    font-weight: 500;
  }

  #pattern-top {
    position: absolute;
    top: 0;
    right: 0;
    height: clamp(12rem, 25vw, 20rem);
    width: clamp(12rem, 25vw, 20rem);
    border-bottom-left-radius: 500px;
    background-color: #f4a261;
    background: linear-gradient(-45deg, #ffb700, #f4a261, #ff7b00);
  }

  #pattern-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: clamp(8rem, 15vw, 12rem);
    width: clamp(8rem, 15vw, 12rem);
    border-top-right-radius: 500px;
    background: linear-gradient(45deg, #ffb700, #f4a261, #ff7b00);
  }
`;

const SignInBtn = styled.button`
  width: 12rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
  font-weight: 500;

  background-color: #121212;
  color: #f2f2f2;
  box-shadow: 5px 5px #efa135;
  transition: all 200ms ease-in-out;

  &:hover {
    box-shadow: 3px 3px #efa135;
  }
`;

const SignIn = () => {
  const handleSignIn = () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <SignInPage>
      <Logo />
      <div id="pattern-top"></div>
      <div id="pattern-bottom"></div>
      <h2>Welcome to UpNxt</h2>
      <p>daily chores, personal projects or office tasks</p>
      <p>keep track and get things done</p>
      <SignInBtn onClick={() => handleSignIn()}>Sign-in with Google</SignInBtn>
    </SignInPage>
  );
};

export default SignIn;
