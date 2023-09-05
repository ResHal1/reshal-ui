import React from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Button = styled.button`
  background: ${MAIN_COLORS.blue};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  width: 30%;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const FormButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  const handleClick = onClick || (() => {});

  return <Button onClick={handleClick}>{text}</Button>;
};

export default FormButton;
