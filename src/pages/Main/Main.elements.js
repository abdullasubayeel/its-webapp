import styled from "styled-components";
import { GridContainer, Container,CenterFlexContainer } from "../../Global";

export const MenuBar = styled(GridContainer)`
  box-sizing: border-box;
  padding: 1rem 0;
  border-right: 2px solid #ddd;
  height: calc(100vh - 60px);
  align-items: flex-start;
`;

export const KanbanContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar{
    display: none;
  }
  > div {
    display: inline-block;
    margin: 0;
  }
`;

export const KanbanColumn = styled(Container)`
  min-width: 300px;
  height: 500px;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  padding: 1rem 0;
  border-radius: 4px;
`;

export const KanbanCard = styled.div`
  padding: 1rem;
  margin: 0 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 2fr 1fr;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

export const JobStatusText = styled.p`
  color: ${(props) => props.textColor};
  margin: 0 1rem;
  font-weight: 400;
  font-size: 14px;
`;
export const JobTitleText = styled.p`
  margin: 0.2rem 0;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  width: 100%;
  color: ${(props) => props.theme.colors.atsBlue};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.atsGreen};
  }
`;
export const JobSubTitle = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 14px;
  width: 100%;
  color: #666666;
`;

export const JobSmallText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;

  color: #6c6c6c;
`;

export const TileHeading = styled.p`
  margin: 0.2rem 0;
  font-weight: ${(props) => (props.active ? "400" : "700")};
  font-size: ${(props) => (props.active ? "16px" : "14px")};
  
  color: ${(props) => (props.active ? props.theme.colors.atsBlue : "#6c6c6c")};
  &:hover {
    cursor: pointer;
  }
`;

export const TileDesc = styled.p`
  margin: 0;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-size: 14px;
  width: 100%;
  color: ${(props) => (props.active ? props.theme.colors.atsBlue : "#6c6c6c")};
  &:hover {
    cursor: pointer;
  }
`;

export const SkillTile = styled(CenterFlexContainer)`
  background-color: #cbcbcb;
  color: #6c6c6c;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.2rem 0.5rem;
  font-size: 12px;
  border-radius: 4px;
`;