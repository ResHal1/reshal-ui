import React from "react";
import Menu from "../components/Menu";
import AdminMenu from "../components/AdminMenu";
import Background from "../img/Green_bg2.webp";
import styled from "styled-components";

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
`;

const AdministratorPage = () => {
  return (
    <div>
      <Menu />
      <AdminMenu />
      <BackgroundImage src={Background} />
    </div>
  );
};

export default AdministratorPage;
