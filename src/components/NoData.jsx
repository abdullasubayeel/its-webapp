import React from "react";
import { GridContainer, LightText } from "../Global.tsx";
import logo from "../assets/empty.png";
import { Button } from "@mui/material";
function NoData({ message, onclick, btnText }) {
  return (
    <GridContainer gap="8px" columns="1fr">
      <img height="280px" src={logo} style={{ margin: "auto" }}></img>
      <LightText style={{ textAlign: "center" }}>{message}</LightText>
      {onclick && (
        <Button
          onClick={onclick}
          style={{
            background: "#D95959",
            color: "white",
            fontWeight: "700",
            margin: "auto",
          }}
        >
          {btnText}
        </Button>
      )}
    </GridContainer>
  );
}

export default NoData;
