import React, { memo } from "react";
import {
  CardContainer,
  CenterFlexContainer,
  GridContainer,
  HeroText,
  MainContainer,
} from "../../Global";
import { TableContainer } from "../Main/Main.elements";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useGetAssignedProjectsQuery } from "../../api/endpoints/userEndpoint";

import NoData from "../../components/NoData";

const DevDashboard = memo(() => {
  const navigate = useNavigate();

  const { data: assignedProjects } = useGetAssignedProjectsQuery();

  return (
    <MainContainer>
      <CardContainer>
        <GridContainer columns="1fr" width="100%">
          <GridContainer columns="1fr" width="100%">
            <HeroText>Assigned Projects</HeroText>
          </GridContainer>
          {assignedProjects?.length === 0 ? (
            <NoData message="No Projects Available"></NoData>
          ) : (
            <TableContainer>
              <table>
                <tr>
                  <th>Project</th>
                  <th>Tickets Count</th>
                  <th>Employees Count</th>
                  <th>Action</th>
                </tr>
                {assignedProjects?.map((obj, i) => {
                  return (
                    <tr>
                      <td>{obj.title}</td>
                      <td>{obj.tickets.length}</td>
                      <td>{obj.employees.length}</td>
                      <td>
                        <CenterFlexContainer>
                          <Button
                            onClick={() => navigate(`/dev/project/${obj._id}`)}
                          >
                            View
                          </Button>
                        </CenterFlexContainer>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </TableContainer>
          )}
        </GridContainer>
      </CardContainer>
    </MainContainer>
  );
});

export default DevDashboard;
