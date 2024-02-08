import React, { useEffect, useState } from "react";
import { LoginContainer, AuthNav } from "./Auth.elements";
import {
  HLine,
  Heading,
  ErrorContainer,
  GridContainer,
  LinkText,
} from "../../Global.tsx";
import { Button, TextField } from "@mui/material";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/atom.png";

function Register() {
  const [fullName, setFullName] = useState();
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPwd] = useState();
  const [cpwd, setCPwd] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== cpwd) {
      setError("Paswords do not match. ");
      return;
    }
    try {
      const registerUser = await axios.post("auth/register", {
        email: email,
        password: password,
        roles: { Candidate: 2001 },
      });

      if (registerUser?.status == 201) {
        console.log("Registered");
        navigate("/");
      }
    } catch (err) {
      console.log("error", err);
      if (err.response?.status === 409) {
        setError("Username is already taken");
        return;
      } else if (err.response?.status === 401) {
        setError("Incorrect Credentials");
        return;
      } else if (err.response?.status === 400) {
        setError("Please enter the required credentials");
        return;
      } else {
        setError("Something went wrong!");
      }

      console.log(err.response);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  useEffect(() => {
    setError("");
  }, [email, fullName, password]);
  return (
    <LoginContainer>
      <Heading>Register</Heading>
      <GridContainer columns="1fr" gap="0.7rem">
        {/* <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        ></TextField> */}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        ></TextField>
        <TextField
          label="Confirm Password"
          type="password"
          value={cpwd}
          onChange={(e) => setCPwd(e.target.value)}
          onKeyDown={handleKeypress}
        />
        <LinkText to="/">Already Member?</LinkText>

        {error && <ErrorContainer>{error}</ErrorContainer>}
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Register
        </Button>
      </GridContainer>
    </LoginContainer>
  );
}

export default Register;
