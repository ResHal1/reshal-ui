import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Label from "../components/Label";
import Button from "./FormButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 600px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 30px;
  margin: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;
const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;

  &:focus {
    border: 1px solid ${MAIN_COLORS.green};
    outline: none;
  }
`;

const ResponsiveWrapper = styled(Wrapper)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResponsiveContainer = styled(Container)`
  flex-wrap: wrap;
`;

interface SuccessMessageProps {
  success: boolean;
}

const SuccessMessage = styled.p<SuccessMessageProps>`
  color: ${(props) => (props.success ? "green" : "red")};
`;

const ObjectTypesForm: React.FC = () => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/facilities/types",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Facility type created successfully!");
        setIsSuccess(true);
        setName("");
      } else {
        setSuccessMessage("Failed to create facility type");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred");
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Objects Types Form</FormTitle>
        <Wrapper>
          <Label htmlFor="Name" text="Name" />
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button text="Submit" />
          {successMessage && (
            <SuccessMessage success={isSuccess}>
              {successMessage}
            </SuccessMessage>
          )}
        </Wrapper>
      </FormContainer>
    </Container>
  );
};

export default ObjectTypesForm;
