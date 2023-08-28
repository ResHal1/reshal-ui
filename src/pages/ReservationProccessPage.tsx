import React from "react";
import ReservationInformation from "../components/ReservationInformation";
import Menu from "../components/Menu";
import styled from "styled-components";
import BgImg from "../img/Green_bg4.webp";

const BookingProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const BookingProcess = () => {
  return (
    <>
      <Menu />
      <BookingProcessContainer>
        <ReservationInformation />
      </BookingProcessContainer>
      <BackgroundImage src={BgImg} />
    </>
  );
};

export default BookingProcess;
