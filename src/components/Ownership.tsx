import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Label from "../components/Label";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 48px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 100%;
  padding: 48px 0;
`;
const Form = styled.form`
  width: 100%;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 0 48px 0 48px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SuccessButton = styled.button`
  padding: 16px;
  background-color: ${MAIN_COLORS.blue};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 16px;
  background-color: ${MAIN_COLORS.red};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 48px;
  gap: 20px;
`;

const Message = styled.div`
  margin-top: 10px;
  color: green;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const OwnershipForm = () => {
  const [email, setEmail] = useState("");
  const [facilityAddress, setFacilityAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [addRevokeSuccess, setRevokeAddSuccess] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<{ id: string; email: string }[]>([]);
  const [facilities, setFacilities] = useState<
    { id: string; address: string }[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/auth",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setUsers(data);
        } else {
          setError("An error occurred while fetching users.");
        }
      } catch (error) {
        setError("An error occurred while communicating with the server.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/facilities/admin",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setFacilities(data);
        } else {
          setError("An error occurred while fetching facilities.");
        }
      } catch (error) {
        setError("An error occurred while communicating with the server.");
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    const user = users.find((user) => user.email === email);
    if (user) {
      setUserId(user.id);
    } else {
      setUserId("");
    }
  }, [email, users]);

  useEffect(() => {
    const facility = facilities.find(
      (facility) => facility.address === facilityAddress
    );
    if (facility) {
      setFacilityId(facility.id);
    } else {
      setFacilityId("");
    }
  }, [facilityAddress, facilities]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFacilityAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFacilityAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("UserId" + userId, "FacilitiId" + facilityId);
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/facilities/assign-ownership",
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

      if (response.ok) {
        setAddSuccess(true);
        setRevokeAddSuccess(false);
        setError("");
      } else {
        setError("An error occurred while adding ownership.");
      }
    } catch (error) {
      setError("An error occurred while communicating with the server.");
    }
  };

  const handleDeleteOwnership = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/facilities/revoke-ownership",
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

      if (response.ok) {
        setRevokeAddSuccess(true);
        setAddSuccess(false);
        setError("");
      } else {
        setError("An error occurred while revoking ownership.");
      }
    } catch (error) {
      setError("An error occurred while communicating with the server.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="Email" text="Email" />
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="Facility Address" text="Facility Address" />
            <Input
              type="text"
              value={facilityAddress}
              onChange={handleFacilityAddressChange}
            />
          </FormGroup>
          <ButtonGroup>
            <SuccessButton type="submit">Add Ownership</SuccessButton>
            <DeleteButton type="button" onClick={handleDeleteOwnership}>
              Delete Ownership
            </DeleteButton>
          </ButtonGroup>
        </Form>
        {addSuccess && <Message>Ownership added successfully!</Message>}
        {addRevokeSuccess && <Message>Ownership revoked successfully!</Message>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Container>
  );
};

export default OwnershipForm;
