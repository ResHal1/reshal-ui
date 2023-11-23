import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styled from "styled-components";
import MyFacilitiesTable from "../components/MyFacilitiesTable";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  justify-content: center;
  margin-top: 64px;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  text-align: right;
`;

const MyFacilitiesPage = () => {
  return (
    <PageContainer>
      <Menu />
      <Content>
        <MyFacilitiesTable />
      </Content>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </PageContainer>
  );
};

export default MyFacilitiesPage;
