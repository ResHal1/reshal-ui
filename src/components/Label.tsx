import React from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const LabelStyle = styled.label`
  font-size: 16px;
  line-height: 24px;
  color: ${MAIN_COLORS.greyLight};
`;

Test;

type LabelProps = {
  htmlFor: string;
  text: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return <LabelStyle htmlFor={htmlFor}>{text}</LabelStyle>;
};

export default Label;
