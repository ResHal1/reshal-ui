import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Button = styled.button`
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  width: 300px;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 600px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
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
        setName(""); // Clear the input field
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
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button type="submit">Submit</Button>
        {successMessage && (
          <SuccessMessage success={isSuccess}>{successMessage}</SuccessMessage>
        )}
      </Wrapper>
    </Form>
  );
};

export default ObjectTypesForm;
