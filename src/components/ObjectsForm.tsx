import React, { useState, useEffect } from "react";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";
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
  width: 1024px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 24px 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
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

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border: 1px solid ${MAIN_COLORS.green};
    outline: none;
  }
`;

const Option = styled.option``;

const ResponsiveWrapper = styled(Wrapper)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResponsiveContainer = styled(Container)`
  flex-wrap: wrap;
`;

const SuccessMessage = styled.p`
  color: green;
`;

const ErrorMessage = styled.p`
  color: red;
`;

interface FacilityType {
  id: string;
  name: string;
}

const ObjectsForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]); // Initial image input
  const [lat, setLatitude] = useState("");
  const [lon, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFacilityTypes = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/facilities/types",
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
          setErrorMessage("");
        } else {
          console.log("Failed to fetch facility types");
          setSuccessMessage("");
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
      lat,
      lon,
      address,
      price,
      images: imageUrls.map((url) => ({ url })),
      typeId,
    };

    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/facilities",
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
        setSuccessMessage("Successfully added object!");
        setName("");
        setDescription("");
        setLatitude("");
        setLongitude("");
        setAddress("");
        setPrice("");
        setImageUrls([]);
        setTypeId("");
      } else {
        setErrorMessage("Failed to create object");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const renderImageInputs = () => {
    return imageUrls.map((url, index) => (
      <Wrapper key={index}>
        <Label htmlFor={`image${index}`} text={`Image ${index + 1}`} />
        <Input
          type="text"
          id={`image${index}`}
          value={url}
          onChange={(e) => updateImageUrl(index, e.target.value)}
          required
        />
      </Wrapper>
    ));
  };

  const addImageInput = () => {
    if (imageUrls.length < 5) {
      setImageUrls([...imageUrls, ""]);
    }
  };

  const updateImageUrl = (index: number, url: string) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = url;
    setImageUrls(updatedImageUrls);
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Wrapper>
          <Label htmlFor="Name" text="Name" />
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Description" text="Description" />
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Type" text="Type" />
          <Select
            id="type"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            required
          >
            <Option value="">Select Type</Option>
            {facilityTypes.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Wrapper>
        {renderImageInputs()}
        <Button text="Add Image" onClick={addImageInput} />{" "}
        <Wrapper>
          <Label htmlFor="Lattitude" text="Lattitude" />
          <Input
            type="number"
            id="latitude"
            value={lat}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Longitude" text="Longitude" />
          <Input
            type="number"
            id="longitude"
            value={lon}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Address" text="Address" />
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="Price" text="Price" />
          <Input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Wrapper>
        <Button text="Submit" />
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </Container>
  );
};

export default ObjectsForm;
