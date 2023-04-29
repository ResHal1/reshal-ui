import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  position: absolute;
  display: flex;
  left: 0;
  z-index: 1;
`;

type ImageProps = {
  img: string;
  alt: string;
};

const GreenBg: React.FC<ImageProps> = ({ img, alt }) => {
  return <Img src={img} alt={alt} />;
};

export default GreenBg;
