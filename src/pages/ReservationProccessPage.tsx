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

const BookingProcess = () => {
  return (
    <>
      <Menu />
      <BookingProcessContainer>
        <ReservationInformation />
      </BookingProcessContainer>
      <Footer />
    </>
  );
};

export default BookingProcess;
