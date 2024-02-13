import React, { useEffect, useState } from "react";
import {
  BackNavigator,
  CenterFlexContainer,
  GridContainer,
  Heading2,
  LightText,
  MainContainer,
} from "../../Global.tsx";
import { MenuBar, ProjectLogoImg } from "./Main.elements";

import logo2 from "../../assets/logo2.png";

//MUI Imports
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DashboardRounded,
  DocumentScanner,
  ForkRight,
  KeyboardArrowLeft,
  LowPriority,
  TableChart,
} from "@mui/icons-material";

import ActiveSprintScreen from "./helpers/ActiveSprintScreen";

import { useGetSingleProjectQuery } from "../../api/endpoints/projectEndpoint";

import { useSelector, useDispatch } from "react-redux";
import { setProjectData } from "../../reduxSlices/projectsSlice";
import RoadMapDashboard from "./Roadmap/RoadMapDashboard";
import BacklogDashboard from "./Backlog/BacklogDashboard";
import Epic from "./Epic/Epic";
import { Button } from "@mui/material";
import { BASE_URL } from "../../utils/constants.js";
import axios from "../../api/axios.js";

function Dashboard() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    data: singleProject,
    isLoading: isSingleProjectLoading,
    isSuccess: isSingleProjectSuccess,
  } = useGetSingleProjectQuery(id);

  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("sprint");

  const navigate = useNavigate();

  function renderBody() {
    if (activeTab === "sprint") {
      return <ActiveSprintScreen></ActiveSprintScreen>;
    } else if (activeTab === "roadmap") {
      return <RoadMapDashboard></RoadMapDashboard>;
    } else if (activeTab === "backlog") {
      return <BacklogDashboard />;
    } else if (activeTab === "reports") {
      return <BacklogDashboard />;
    } else if (activeTab === "epic") {
      return <Epic />;
    }
  }

  //store selected project in redux store
  useEffect(() => {
    dispatch(
      setProjectData({
        projectId: singleProject?.id,
        description: singleProject?.description,
        tickets: singleProject?.tickets,
        employees: singleProject?.developers,
        title: singleProject?.title,
      })
    );
  }, [singleProject]);

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
    <GridContainer
      align="flex-start"
      style={{ background: "#f5f5f5" }}
      columns="250px 1fr"
    >
      <MenuBar place="flex-start">
        <BackNavigator
          columns="auto auto"
          justify="flex-start"
          onClick={() =>
            location.pathname.split("/").includes("dev")
              ? navigate("/dev")
              : navigate("/home")
          }
        >
          <KeyboardArrowLeft></KeyboardArrowLeft>
          <LightText>Back to Projects</LightText>
        </BackNavigator>

        <GridContainer style={{ flex: 1 }} columns="1fr 3fr">
          <ProjectLogoImg src={logo2}></ProjectLogoImg>
          <div>
            <Heading2>{singleProject?.title}</Heading2>
            <LightText>Software Project</LightText>
          </div>
        </GridContainer>

        <List
          sx={{ width: "100%", bgcolor: "#f5f5f5" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ bgcolor: "#f5f5f5" }}
              component="div"
              id="nested-list-subheader"
            >
              Planning Board
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardRounded />
            </ListItemIcon>
            <ListItemText
              primary={`${singleProject?.title} Board`}
              onClick={() => setOpen(!open)}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                onClick={() => setActiveTab("roadmap")}
                selected={activeTab === "roadmap"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <ForkRight />
                </ListItemIcon>
                <ListItemText primary="Roadmap" />
              </ListItemButton>
              <ListItemButton
                onClick={() => setActiveTab("backlog")}
                selected={activeTab === "backlog"}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <LowPriority />
                </ListItemIcon>
                <ListItemText primary="Backlog" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setActiveTab("sprint")}
                selected={activeTab === "sprint"}
              >
                <ListItemIcon>
                  <TableChart />
                </ListItemIcon>
                <ListItemText primary="Active Sprint" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setActiveTab("reports")}
                selected={activeTab === "reports"}
              >
                <ListItemIcon>
                  <DocumentScanner />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            onClick={() => setActiveTab("epic")}
            selected={activeTab === "epic"}
          >
            <ListItemIcon>
              <ForkRight />
            </ListItemIcon>
            <ListItemText primary="Epics" />
          </ListItemButton>
        </List>
        <CenterFlexContainer
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            right: "1rem",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="container"
            style={{
              background: "#224368",
              color: "white",
              fontWeight: "400",
              width: "100%",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CenterFlexContainer>
      </MenuBar>

      {renderBody()}
    </GridContainer>
  );
}

export default Dashboard;
