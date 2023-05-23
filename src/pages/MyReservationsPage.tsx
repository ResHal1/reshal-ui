import React from "react";
import Menu from "../components/Menu";
import ReservationsTable from "../components/MyReservationsTable";
import Background from "../img/Green_bg2.webp";
import styled from "styled-components";

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
`;

const ReservationsPage = () => {
  return (
    <div>
      <Menu />
      <ReservationsTable />
      <BackgroundImage src={Background} />
    </div>
  );
};

export default ReservationsPage;
