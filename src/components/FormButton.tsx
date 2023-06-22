import React from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Button = styled.button`
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  width: 100%;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
`;

interface ButtonProps {
  text: string;
  onClick?: () => void; // Make onClick prop optional by adding "?"
}

const FormButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  const handleClick = onClick || (() => {}); // Set a default empty function if onClick is not provided

  return <Button onClick={handleClick}>{text}</Button>;
};

export default FormButton;
