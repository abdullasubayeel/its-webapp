import React, { useEffect, useState } from "react";
import { LoginContainer } from "./Auth.elements";
import {
  ErrorContainer,
  GridContainer,
  Heading,
  LinkText,
} from "../../Global.tsx";
import { Button, FormControlLabel, TextField } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

function SetPassword() {
  //   const { token } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [cpwd, setCPwd] = useState("");

  const handleSubmit = async () => {
    try {
      if (pwd !== cpwd) {
        setError("Passwords don't match.");
        return;
      }

      const response = await axios.post(
        BASE_URL + "/user/set-password",
        {
          password: pwd,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong");
    }
  };
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    setError("");
  }, [pwd, cpwd]);
  return (
    <LoginContainer>
      <Heading>Set Your Password for ATOM</Heading>
      <GridContainer gap="0.8rem">
        <TextField
          label="Password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onKeyDown={handleKeypress}
          autoComplete="off"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={cpwd}
          onChange={(e) => setCPwd(e.target.value)}
          onKeyDown={handleKeypress}
          autoComplete="off"
        />
        {error && <ErrorContainer>{error}</ErrorContainer>}
        <Button type="submit" onClick={handleSubmit} variant="contained">
          Login
        </Button>
      </GridContainer>
    </LoginContainer>
  );
}

export default SetPassword;
