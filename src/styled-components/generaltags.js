import styled from "styled-components";

export const MainDiv = styled.div`
  color: ${(props) => props.theme.colors.textColor} !important;
  background-color: ${(props) => props.theme.colors.bgColor} !important;
`;

export const HeaderStrip = styled.div`
color: ${(props) => props.theme.colors.textColor} !important;
  background-color: ${(props) => props.theme.colors.bgColorLight} !important;
`;
