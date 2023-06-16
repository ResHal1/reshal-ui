import React, { useState } from "react";
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

const ObjectsForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [hallImage, setHallImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <FormInput
        type="text"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <FormLabel htmlFor="hallImage">Hall Image:</FormLabel>
      <FormInput
        type="text"
        id="hallImage"
        value={hallImage}
        onChange={(e) => setHallImage(e.target.value)}
      />

      <FormLabel htmlFor="latitude">Latitude:</FormLabel>
      <FormInput
        type="text"
        id="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <FormLabel htmlFor="longitude">Longitude:</FormLabel>
      <FormInput
        type="text"
        id="longitude"
        value={longitude}
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
