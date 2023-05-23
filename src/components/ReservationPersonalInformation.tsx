import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

type ReservationPersonalInformationProps = {
  nextStep: () => void;
  prevStep: () => void;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${MAIN_COLORS.lightGrey};
  padding: 20px;
`;

const Form = styled.form`
  width: 800px;
  min-width: 400px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const InfoInput = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 200px;
  padding: 10px;
  resize: vertical;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled.label``;

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
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
  width: 30%;
`;

const ReservationPersonalInformation: React.FC<
  ReservationPersonalInformationProps
> = ({ nextStep, prevStep }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and validation logic here

    // Move to the next step
    nextStep();
  };

  return (
    <FormContainer>
      <h2>Step 2: Personal Information</h2>
      <Form onSubmit={handleSubmit}>
        <Flex>
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
        </Flex>
        <Flex>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Phone Number:</Label>
            <Input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </InputGroup>
        </Flex>
        <Info>
          <Label>Additional Information</Label>
          <InfoInput
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            required
          />
        </Info>
        <ButtonContainer>
          <Button type="button" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next Step</Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default ReservationPersonalInformation;
