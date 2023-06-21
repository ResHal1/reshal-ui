import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 300px;
  padding: 5px;
  margin-bottom: 10px;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface FacilityType {
  id: number;
  name: string;
}

const ObjectsForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<number | string>("");
  const [imageUrl, setimageUrl] = useState("");
  const [lat, setLatitude] = useState("");
  const [lon, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);

  useEffect(() => {
    const fetchFacilityTypes = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/facilities/types",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data: FacilityType[] = await response.json();
          setFacilityTypes(data);
        } else {
          console.log("Failed to fetch facility types");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchFacilityTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const facilityData = {
      name,
      description,
      typeId,
      imageUrl,
      lat,
      lon,
      address,
      price,
    };

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/facilities/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(facilityData),
        }
      );

      if (response.ok) {
        console.log("Facility created!");
        setName("");
        setDescription("");
        setTypeId("");
        setimageUrl("");
        setLatitude("");
        setLongitude("");
        setAddress("");
        setPrice("");
      } else {
        console.log("Failed to create facility");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Objects Form</FormTitle>
      <FormLabel htmlFor="name">Name:</FormLabel>
      <FormInput
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormLabel htmlFor="description">Description:</FormLabel>
      <FormInput
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormLabel htmlFor="type">Type:</FormLabel>
      <select
        id="type"
        value={typeId}
        onChange={(e) => setTypeId(Number(e.target.value))}
      >
        <option value="">Select Type</option>
        {facilityTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <FormLabel htmlFor="hallImage">Hall Image:</FormLabel>
      <FormInput
        type="text"
        id="hallImage"
        value={imageUrl}
        onChange={(e) => setimageUrl(e.target.value)}
      />

      <FormLabel htmlFor="latitude">Latitude:</FormLabel>
      <FormInput
        type="number"
        id="latitude"
        value={lat}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <FormLabel htmlFor="longitude">Longitude:</FormLabel>
      <FormInput
        type="number"
        id="longitude"
        value={lon}
        onChange={(e) => setLongitude(e.target.value)}
      />

      <FormLabel htmlFor="address">Address:</FormLabel>
      <FormInput
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <FormLabel htmlFor="price">Price:</FormLabel>
      <FormInput
        type="text"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <FormButton type="submit">Submit</FormButton>
    </FormContainer>
  );
};

export default ObjectsForm;
