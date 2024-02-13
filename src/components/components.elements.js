import styled from "styled-components";
import { CenterFlexContainer, GridContainer } from "../Global.tsx";

export const NavContainer = styled.div`
  /* border-bottom: 2px solid #ddd; */
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0 2rem;
`;

export const NavWrapper = styled(GridContainer)`
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 60px;
  /* max-width: 1240px; */
  margin: auto;
`;

export const LogoText = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #224368;
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 2rem;
  & > li {
    margin: 0 8px;
    color: #000;
    font-weight: 400;
    transition: 0.5s;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      font-weight: 500;
      color: #6dddc1;
    }
  }
  & > li > a {
    text-decoration: none;
    color: inherit;
  }
`;

export const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  background-color: #e58f52;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.7rem;
`;
