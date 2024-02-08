import React, { useContext, useReducer, useState } from "react";
import logo from "../assets/atom.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import {
  LogoText,
  NavContainer,
  NavWrapper,
  NavLinks,
  SearchBtn,
} from "./components.elements";
import {
  CenterFlexContainer,
  GridContainer,
  Heading2,
  LightText,
  HLine,
  Absolute,
  TextButton,
} from "../Global.tsx";
import SearchField from "./SearchField";
import { FaSearch } from "react-icons/fa";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import axios from "axios";
import { customStyle } from "../utils/modalStyles";
import { useSelector } from "react-redux";
import { useAddProjectTicketMutation } from "../api/endpoints/projectEndpoint";
import { useDispatch } from "react-redux";
import { setProjectData } from "../reduxSlices/projectsSlice";
import { useGetDeveloperQuery } from "../api/endpoints/managerEndpoint";
import { BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthProvider.js";
import { useAddTicketMutation } from "../api/endpoints/ticketsEndpoint.js";

const ACTION = {
  projectId: "handleProjectId",
  issueType: "handleIssue",
  status: "handleStatus",
  description: "handleDesc",
  assignee: "handleAssignee",
  reporter: "handleReporter",
  priority: "handlePriority",
  sprint: "handleSprint",
  title: "handleTitle",
};
function Navbar() {
  const location = useLocation();
  const { isAddingTicketModal, setAddingTicketModal } = useContext(AuthContext);

  const [addTicket, { isLoading: isAddTicketLoading }] = useAddTicketMutation();
  const {
    data: myDevelopers,
    isLoading: isDevelopersLoading,
    isSuccess: isDevelopersSuccess,
  } = useGetDeveloperQuery();

  const navigate = useNavigate();
  const data = useSelector((state) => state.project);

  const dispatchRedux = useDispatch();
  console.log("data", data);
  function reducer(state, action) {
    switch (action.type) {
      case ACTION.projectId:
        return { ...state, projectId: action.payload };
      case ACTION.issueType:
        return { ...state, issueType: action.payload };
      case ACTION.status:
        return { ...state, status: action.payload };
      case ACTION.description:
        return { ...state, description: action.payload };
      case ACTION.assignee:
        return { ...state, assignee: action.payload };
      case ACTION.reporter:
        return { ...state, reporter: action.payload };
      case ACTION.priority:
        return { ...state, priority: action.payload };
      case ACTION.title:
        return { ...state, title: action.payload };
      case ACTION.sprint:
        return { ...state, sprint: action.payload };
      case ACTION.reset:
        return {
          issueType: "",
          status: "",
          description: "",
          assignee: "",
          reporter: "",
          priority: "",
          title: "",
        };
    }
  }
  const [issueData, dispatch] = useReducer(reducer, {
    issueType: "",
    status: "",
    description: "",
    assignee: "",
    reporter: "",
    priority: "",
    title: "",
  });
  function openModal() {
    setAddingTicketModal(true);
  }
  function closeModal() {
    setAddingTicketModal(false);
  }

  const dummyIssues = [
    { id: 1, type: "Task" },
    { id: 2, type: "Story" },
    { id: 3, type: "Bug" },
    { id: 4, type: "Epic" },
  ];
  const dummyStatus = [
    { key: "TODO", status: "TO DO" },
    { key: "DevelopmentCompleted", status: "Development Completed" },
    { key: "InProgress", status: "In Progress" },
    { key: "InQA", status: "In QA" },
    { key: "Done", status: "Done" },
  ];
  const dummyPriority = [
    { id: 1, type: "Highest" },
    { id: 2, type: "High" },
    { id: 3, type: "Low" },
    { id: 4, type: "Lowest" },
  ];
  const dummySprint = [
    { id: 1, type: "Sprint 1" },
    { id: 2, type: "Sprint 2" },
    { id: 3, type: "Sprint 3" },
    { id: 4, type: "Sprint 4" },
  ];

  console.log("project ID", data?.projectId);
  async function handleSubmit() {
    const response = await addTicket({
      ...issueData,
      projectId: data?.projectId,
    });
    // dispatchRedux(
    //   setProjectData({
    //     title: response?.data?.title,
    //     description: response?.data?.description,
    //     projectId: response?.data?.projectId,
    //     tickets: response?.data?.tickets,
    //     employex
    // dispatch({ type: ACTION.reset });
    // setAddingTicketModal(false);
  }

  async function handleLogout() {
    axios
      .post(BASE_URL + "/auth/logout")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  }
  return (
    <>
      <NavContainer>
        <ReactModal
          isOpen={isAddingTicketModal}
          onRequestClose={closeModal}
          style={customStyle}
        >
          <GridContainer
            style={{ borderBottom: "2px solid #ddd" }}
            padding="1rem"
            justify="space-between"
            columns="auto auto"
          >
            <Heading2>Create Issue</Heading2>
            <Close onClick={() => setAddingTicketModal(false)} />
          </GridContainer>

          <GridContainer
            justify="flex-start"
            place="flex-start"
            columns="1fr"
            padding="1rem"
          >
            <LightText>
              Project Name: <Heading2>{data.title}</Heading2>
            </LightText>

            <TextField
              label="Issue Title"
              value={issueData.title}
              onChange={(e) => {
                dispatch({ type: ACTION.title, payload: e.target.value });
              }}
            ></TextField>
            <GridContainer columns="repeat(auto-fill,minmax(280px ,1fr))">
              <FormControl fullWidth>
                <InputLabel id="issue-label">Issue Type *</InputLabel>
                <Select
                  fullWidth
                  labelId="issue-label"
                  value={issueData.issueType}
                  label="Issue Type *"
                  onChange={(e) => {
                    dispatch({
                      type: ACTION.issueType,
                      payload: e.target.value,
                    });
                  }}
                >
                  {dummyIssues.map((dp) => {
                    return <MenuItem value={dp.type}>{dp.type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  fullWidth
                  labelId="status-label"
                  value={issueData.status}
                  label="Status *"
                  onChange={(e) => {
                    dispatch({ type: ACTION.status, payload: e.target.value });
                  }}
                >
                  {dummyStatus.map((dp) => {
                    return <MenuItem value={dp.key}>{dp.status}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </GridContainer>

            <TextField
              label="Description"
              value={issueData.description}
              onChange={(e) => {
                dispatch({ type: ACTION.description, payload: e.target.value });
              }}
            ></TextField>

            <HLine />

            <GridContainer columns="repeat(auto-fill,minmax(280px,1fr))">
              <FormControl fullWidth>
                <InputLabel id="status-label">Reporter</InputLabel>
                <Select
                  fullWidth
                  labelId="status-label"
                  value={issueData.reporter}
                  label="Reporter *"
                  onChange={(e) => {
                    dispatch({
                      type: ACTION.reporter,
                      payload: e.target.value,
                    });
                  }}
                >
                  {data.employees?.map((dp) => {
                    return <MenuItem value={dp.id}>{dp.fullName}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">
                  Assignee
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  value={issueData.assignee}
                  onChange={(e) => {
                    dispatch({
                      type: ACTION.assignee,
                      payload: e.target.value,
                    });
                  }}
                  label="Assignee *"
                >
                  {data.employees?.map((dp) => {
                    return <MenuItem value={dp.id}>{dp.fullName}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </GridContainer>

            <HLine />
            <GridContainer columns="repeat(auto-fill,minmax(280px,1fr))">
              <FormControl>
                <InputLabel id="status-label">Priority</InputLabel>
                <Select
                  fullWidth
                  labelId="status-label"
                  value={issueData.priority}
                  label="Priority *"
                  onChange={(e) => {
                    dispatch({
                      type: ACTION.priority,
                      payload: e.target.value,
                    });
                  }}
                >
                  {dummyPriority.map((dp) => {
                    return <MenuItem value={dp.type}>{dp.type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="status-label">Sprint</InputLabel>
                <Select
                  fullWidth
                  labelId="status-label"
                  value={issueData.sprint}
                  label="Sprint"
                  onChange={(e) => {
                    dispatch({ type: ACTION.sprint, payload: e.target.value });
                  }}
                >
                  {dummySprint.map((dp) => {
                    return <MenuItem value={dp.type}>{dp.type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </GridContainer>
          </GridContainer>

          <GridContainer
            justify="space-between"
            style={{ borderTop: "2px solid #ddd" }}
            padding="0 0.7rem"
            columns="auto auto"
          >
            <TextButton onClick={() => setAddingTicketModal(false)}>
              Cancel
            </TextButton>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </GridContainer>
        </ReactModal>
        <NavWrapper>
          <GridContainer columns="auto 1fr">
            <img height="40px" src={logo}></img>
            <LogoText>Atom</LogoText>
          </GridContainer>

          <NavLinks>
            <li>
              <Link>Your Work</Link>
            </li>
            <li>
              <Link to="/home">Projects</Link>
            </li>
            <li>
              <Link>Filters</Link>
            </li>
            <li>
              <Link>Dashboards</Link>
            </li>
            {location.pathname.split("/").includes("project") && (
              <Button
                style={{ background: "#6B7EBF" }}
                onClick={openModal}
                variant="contained"
              >
                Create
              </Button>
            )}
          </NavLinks>
          {/* <TextField label="Search" margin="dense"></TextField> */}
          <CenterFlexContainer>
            <SearchField />
          </CenterFlexContainer>

          <Button
            variant="container"
            style={{ background: "#224368", color: "white", fontWeight: "400" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </NavWrapper>
      </NavContainer>
      <Outlet />
    </>
  );
}

export default Navbar;
