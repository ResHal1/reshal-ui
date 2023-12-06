import React from "react";
import ReservationInformation from "../components/ReservationInformation";
import Menu from "../components/Menu";
import styled from "styled-components";
import Footer from "../components/Footer";

const BookingProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FooterContainer = styled.div`
  margin-top: auto;
  text-align: right;
`;

const BookingProcess = () => {
  return (
    <PageContainer>
      <Menu />
      <BookingProcessContainer>
        <ReservationInformation />
      </BookingProcessContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </PageContainer>
  );
};

export default BookingProcess;
