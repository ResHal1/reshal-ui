import React from "react";
import Menu from "../components/Menu";
import AdminMenu from "../components/AdminMenu";
import Footer from "../components/Footer";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AdministratorPage = () => {
  return (
    <PageContainer>
      <Menu />
      <AdminMenu />
      <Footer />
    </PageContainer>
  );
};

export default AdministratorPage;
