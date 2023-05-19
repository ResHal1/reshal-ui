import React from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Form = styled.form`
  width: 100%;
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

type ReservationInformationProps = {
  nextStep: () => void;
};

const ReservationInformation: React.FC<ReservationInformationProps> = ({
  nextStep,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and validation logic here

    // Move to the next step
    nextStep();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Step 1: Reservation Information</h2>
      {/* Reservation information form fields */}
      {/* ... */}
      <Button type="submit">Next Step</Button>
    </Form>
  );
};

export default ReservationInformation;
