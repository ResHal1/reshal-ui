import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import { useLocation } from "react-router-dom";
import TypeIcon from "../img/Pitch.png";
import TimeIcon from "../img/Time.png";
import DollarIcon from "../img/Dollar.png";
import LocationIcon from "../img/LocationIcon.webp";
import Button from "../components/FormButton";

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  padding: 20px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 5px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HallImg = styled.img`
  width: 100%;
  border-radius: 20px;
  margin-top: 16px;
`;

const Description = styled.h2`
  margin: 0;
`;

const Price = styled.h3`
  color: ${MAIN_COLORS.green};
  font-size: 30px;
  margin: 0;
  align-items: center;
  display: flex;
  gap: 10px;
`;

const Address = styled.span`
  font-size: 16px;
  color: ${MAIN_COLORS.greyLight};
`;

const Time = styled.span`
  font-size: 18px;
`;

const Type = styled.span`
  padding: 10px 0;
`;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  gap: 12px;
  border: 1px solid ${MAIN_COLORS.lightGrey};
  border-radius: 20px;
  padding: 48px;
  width: 100%;
  max-width: 600px;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const Input = styled.input`
  margin: 10px 0;
  width: 100%;
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

    console.log(selectedMarkerData?.id, startTime, endTime);
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/reservations",
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
      {error && <p style={{ color: errorColor, marginTop: "8px" }}>{error}</p>}
      <Box>
        <Container>
          <Description>{selectedMarkerData?.name}</Description>
          <HallImg src={selectedMarkerData?.images[0].url} alt="Hall Image" />
          <Main>
            <Wrapper>
              <Icon src={TypeIcon} />
              <Type>{selectedMarkerData?.type.name}</Type>
            </Wrapper>
            <Wrapper>
              <Icon src={LocationIcon} />
              <Address>{selectedMarkerData?.address}</Address>
            </Wrapper>
            <Price>
              <Icon src={DollarIcon} />
              <div>
                {parseInt(selectedMarkerData?.price)}
                <Time>/60min</Time>
              </div>
            </Price>
            <Wrapper>
              <Icon src={TimeIcon} />
              <label htmlFor="startTime">Start Time:</label>
            </Wrapper>
            <Input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Wrapper>
              <Icon src={TimeIcon} />
              <label htmlFor="endTime">End Time:</label>
            </Wrapper>
            <Input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Main>
          <ButtonWrapper>
            <Button text="Submit"></Button>
          </ButtonWrapper>
        </Container>
      </Box>
    </Form>
  );
};

export default ReservationInformation;
