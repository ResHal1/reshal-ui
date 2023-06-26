import React from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import { useLocation } from "react-router-dom";

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  width: 100%;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HallImg = styled.img`
  width: 100%;
  max-height: 175px;
`;

const Description = styled.h2`
  padding: 0px;
  margin: 0px;
`;

const Price = styled.h3`
  color: ${MAIN_COLORS.green};
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;

const Address = styled.span`
  font-size: 16px;
  color: ${MAIN_COLORS.greyLight};
`;

const Time = styled.span`
  font-size: 18px;
`;

const Type = styled.span``;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  border: 1px solid ${MAIN_COLORS.lightGrey};
  border-radius: 20px;
  padding: 10px;
  width: 50%;
  max-width: 600px;
`;

type ReservationInformationProps = {
  nextStep: () => void;
  selectedMarkerData: any;
};

const ReservationInformation: React.FC<ReservationInformationProps> = ({
  nextStep,
}) => {
  const location = useLocation();
  const selectedMarkerData = location.state?.selectedMarkerData || null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Step 1: Reservation Information</h2>
      <Box>
        <Container>
          <Description>{selectedMarkerData.name}</Description>
          <HallImg src={selectedMarkerData.imageUrl} alt="Hall Image" />
          <Type>{selectedMarkerData.type.name}</Type>
          <Address>{selectedMarkerData.address}</Address>
          <Price>
            ${selectedMarkerData.price}
            <Time>/60min</Time>
          </Price>
          <Button type="submit">Next Step</Button>
        </Container>
      </Box>
    </Form>
  );
};

export default ReservationInformation;
