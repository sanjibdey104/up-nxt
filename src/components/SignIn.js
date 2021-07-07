import React, { useContext } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router";
import styled from "styled-components";

const SignInPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SignInBtn = styled.button`
  width: 15rem;
  padding: 0.3rem;
  border-radius: 0.5rem;

  background-color: #ff6347da;
  border: 1px solid black;
  box-shadow: 2px 2px #000;
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
      <h2>Welcome to UpNxt</h2>
      <p>track your tasks</p>
      <p>...and get things done!!!</p>
      <SignInBtn onClick={() => handleSignIn()}>Sign-in with Google</SignInBtn>
    </SignInPage>
  );
};

export default SignIn;
