import React, { useState, useEffect } from "react";
import {
  CardContainer,
  ErrorContainer,
  GridContainer,
  Heading,
  LinkText,
} from "../../Global";
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  FormControlLabel,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../api/auth/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import logo from "../../assets/atom.png";

import axios from "axios";
import { LoginContainer, AuthNav } from "./Auth.elements";
import { BASE_URL } from "../../utils/constants";
const LOGIN_URL = BASE_URL + "/auth/login";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [error, setError] = useState("");

  const { setAuth, persist, setPersist, auth } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.access_token;
      const user = jwtDecode(accessToken);
      console.log(user.UserInfo.email);
      const userId = user.UserInfo.userId;
      const token_email = user.UserInfo.email;
      const role = user.UserInfo.roles;

      if (response.status === 200) {
        if (role === "MANAGER") {
          navigate("/home");
        } else {
          navigate("/dev");
        }
      }
      setAuth({ user: token_email, role, accessToken, userId });
      dispatch(setCredentials({ user: { email, role, accessToken, userId } }));
      setUser("");
      setPwd("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };
  const togglePersist = (e) => {
    setPersist(e.target.checked);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <LoginContainer>
      <Heading>Login</Heading>
      <GridContainer gap="0.8rem">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={handleKeypress}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={handleKeypress}
        />

        {error && <ErrorContainer>{error}</ErrorContainer>}
        <LinkText to="/register">Not Registered?</LinkText>

        <FormControlLabel
          control={<Checkbox checked={persist} onChange={togglePersist} />}
          label="Remember Me"
        />

        <Button type="submit" onClick={handleSubmit} variant="contained">
          Login
        </Button>
      </GridContainer>
    </LoginContainer>
  );
}

export default Login;
