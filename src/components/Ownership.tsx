import React, { useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SuccesButton = styled.button`
  padding: 10px 15px;
  background-color: ${MAIN_COLORS.green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 10px 15px;
  background-color: ${MAIN_COLORS.red};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Message = styled.div`
  margin-top: 10px;
  color: green;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
`;

const OwnershipForm = () => {
  const [userId, setUserId] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleFacilityIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFacilityId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/facilities/assign-ownership",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            facilityId,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setAddSuccess(true);
        setDeleteSuccess(false);
        setError("");
      } else {
        setAddSuccess(false);
        setError("An error occurred while adding ownership.");
      }
    } catch (error) {
      setError("An error occurred while adding ownership.");
    }
  };

  const handleDeleteOwnership = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/facilities/revoke-ownership",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            facilityId,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setDeleteSuccess(true);
        setAddSuccess(false);
        setError("");
      } else {
        setDeleteSuccess(false);
        setError("An error occurred while deleting ownership.");
      }
    } catch (error) {
      setError("An error occurred while deleting ownership.");
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>User ID:</Label>
          <Input type="text" value={userId} onChange={handleUserIdChange} />
        </FormGroup>
        <FormGroup>
          <Label>Facility ID:</Label>
          <Input
            type="text"
            value={facilityId}
            onChange={handleFacilityIdChange}
          />
        </FormGroup>
        <ButtonGroup>
          <SuccesButton type="submit">Add Ownership</SuccesButton>
          <DeleteButton type="button" onClick={handleDeleteOwnership}>
            Delete Ownership
          </DeleteButton>
        </ButtonGroup>
      </form>
      {addSuccess && <Message>Ownership added successfully!</Message>}
      {deleteSuccess && <Message>Ownership deleted successfully!</Message>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
};

export default OwnershipForm;
