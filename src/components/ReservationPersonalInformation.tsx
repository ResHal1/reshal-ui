import React, { useState } from "react";
import styled from "styled-components";

type ReservationPersonalInformationProps = {
  nextStep: () => void;
  prevStep: () => void;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ReservationPersonalInformation: React.FC<
  ReservationPersonalInformationProps
> = ({ nextStep, prevStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and validation logic here

    // Move to the next step
    nextStep();
  };

  return (
    <FormContainer>
      <h2>Step 2: Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>First Name:</Label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Last Name:</Label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <ButtonContainer>
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next Step</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default ReservationPersonalInformation;
