import React, { useState } from "react";
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

const ReservationInformation: React.FC = () => {
  const location = useLocation();
  const selectedMarkerData = location.state?.selectedMarkerData || null;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [errorColor, setErrorColor] = useState("red");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/reservations",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            facilityId: selectedMarkerData?.id,
            startTime,
            endTime,
          }),
        }
      );
      if (response.ok) {
        console.log("Reservation successful");
        setError("Successfully reserved object");
        setErrorColor("green");
      } else {
        console.log("Reservation failed");
        setError("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing your reservation.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reservation Information</h2>
      {error && <p style={{ color: errorColor }}>{error}</p>}
      <Box>
        <Container>
          <Description>{selectedMarkerData?.name}</Description>
          <HallImg src={selectedMarkerData?.imageUrl} alt="Hall Image" />
          <Type>{selectedMarkerData?.type.name}</Type>
          <Address>{selectedMarkerData?.address}</Address>
          <Price>
            ${parseInt(selectedMarkerData?.price)}
            <Time>/60min</Time>
          </Price>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </Container>
      </Box>
    </Form>
  );
};

export default ReservationInformation;
