import React from "react";
import Menu from "../components/Menu";
import ReservationsTable from "../components/MyReservationsTable";
import Footer from "../components/Footer";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ReservationsPage = () => {
  return (
    <PageContainer>
      <Menu />
      <ReservationsTable />
      <Footer />
    </PageContainer>
  );
};

export default ReservationsPage;
