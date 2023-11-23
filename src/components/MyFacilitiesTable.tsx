import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
`;

const TableContainer = styled.div`
  max-width: 956px;
  width: 100%;
  overflow-x: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px 15px;
  border-bottom: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
`;

const Update = styled.button`
  margin: 5px 0;
  padding: 10px;
  background-color: ${MAIN_COLORS.blue};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const DescriptionCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  width: 30%; /* Adjust the width as needed */
`;

interface Facility {
  id: string;
  name: string;
  description: string;
  lat: number;
  lon: number;
  address: string;
  price: string;
  images: { url: string }[];
  type: {
    name: string;
    id: string;
  };
  typeId: string;
  owners: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }[];
}

interface FacilityType {
  id: string;
  name: string;
}

const MyFacilitiesTable = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/facilities/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (Array.isArray(data)) {
            setFacilities(data);
          } else {
            setError("Invalid data format");
          }
        } else {
          setError("Error fetching facilities");
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setError("Error fetching facilities");
      }
    };

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
          const data = await response.json();
          if (Array.isArray(data)) {
            setFacilityTypes(data);
          } else {
            setError("Invalid facility types data format");
          }
        } else {
          setError("Error fetching facility types");
        }
      } catch (error) {
        console.error("Error fetching facility types:", error);
        setError("Error fetching facility types");
      }
    };

    fetchFacilities();
    fetchFacilityTypes();
  }, []);

  const handleFieldChange = (
    facilityId: string,
    field: keyof Facility,
    value: any
  ) => {
    setFacilities((prevFacilities) =>
      prevFacilities.map((facility) => {
        if (facility.id === facilityId) {
          return {
            ...facility,
            [field]: value,
          };
        }
        return facility;
      })
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  const handleUpdateClick = async (facilityId: string) => {
    const facilityToUpdate = facilities.find(
      (facility) => facility.id === facilityId
    );

    if (!facilityToUpdate) {
      return;
    }

    const updatedImages = facilityToUpdate.images.filter(
      (image) => image.url !== ""
    );

    const updatedFacility = {
      ...facilityToUpdate,
      images: updatedImages,
    };

    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFacility),
        }
      );

      if (response.ok) {
      } else {
        setError("Error updating facility");
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      setError("Error updating facility");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Facility ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Latitude</TableHeader>
              <TableHeader>Longitude</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Image URLs</TableHeader>{" "}
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>{facility.id}</TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={facility.name}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "name", e.target.value)
                    }
                  />
                </TableCell>
                <DescriptionCell>
                  <textarea
                    value={facility.description}
                    onChange={(e) =>
                      handleFieldChange(
                        facility.id,
                        "description",
                        e.target.value
                      )
                    }
                    style={{ width: "100%", textAlign: "start" }}
                  />
                </DescriptionCell>
                <TableCell>
                  <input
                    type="number"
                    value={facility.lat}
                    onChange={(e) =>
                      handleFieldChange(
                        facility.id,
                        "lat",
                        e.target.valueAsNumber
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={facility.lon}
                    onChange={(e) =>
                      handleFieldChange(
                        facility.id,
                        "lon",
                        e.target.valueAsNumber
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={facility.address}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "address", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    value={facility.price}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "price", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={facility.typeId}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "typeId", e.target.value)
                    }
                  >
                    {facilityTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      value={
                        facility.images[index] ? facility.images[index].url : ""
                      }
                      onChange={(e) => {
                        const newImages = [...facility.images];
                        newImages[index] = { url: e.target.value };
                        handleFieldChange(facility.id, "images", newImages);
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Update onClick={() => handleUpdateClick(facility.id)}>
                    Update
                  </Update>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyFacilitiesTable;
