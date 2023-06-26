import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Label from "../components/Label";
import Button from "./FormButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

interface FacilityType {
  id: string;
  name: string;
}

const ObjectTypesForm: React.FC = () => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);

  useEffect(() => {
    fetchFacilityTypes();
  }, []);

  const fetchFacilityTypes = async () => {
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/facilities/types",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFacilityTypes(data);
      } else {
        console.log("Failed to fetch facility types");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        fetchFacilityTypes();
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
  const handleDelete = async (typeId: string) => {
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.live/facilities/types/${typeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSuccessMessage("Facility type deleted successfully!");
        setIsSuccess(true);
        fetchFacilityTypes();
      } else {
        setSuccessMessage("Failed to delete facility type");
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
        <FormTitle>Create Types Form</FormTitle>
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
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {facilityTypes.map((facilityType) => (
              <TableRow key={facilityType.id}>
                <TableCell>{facilityType.name}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => handleDelete(facilityType.id)}>
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ObjectTypesForm;
