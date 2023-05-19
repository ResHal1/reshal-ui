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

const ReservatioPaymentProcess = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and payment logic here

    // Show success message or redirect to confirmation page
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Step 3: Payment Process</h2>
      {/* Payment form fields */}
      {/* ... */}
      <Button type="submit">Submit Payment</Button>
    </Form>
  );
};

export default ReservatioPaymentProcess;
