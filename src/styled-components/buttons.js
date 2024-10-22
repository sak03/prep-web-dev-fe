import styled from "styled-components";

export const LightButton = styled.button`
  color: ${(props) => props.theme.colors.textButtonColorLight} !important;
  background-color: ${(props) => props.theme.colors.bgButtonColorLight} !important;
`;

export const DarkButton = styled.button`
  color: ${(props) => props.theme.colors.textButtonColor} !important;
  background-color: ${(props) => props.theme.colors.bgButtonsColor} !important;
`;