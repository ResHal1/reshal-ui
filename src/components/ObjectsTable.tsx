import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const TableContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Select = styled.select`
  padding: 10px;
`;

const Delete = styled.button`
  padding: 10px;
  background-color: ${MAIN_COLORS.red};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
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

const ObjectsTable: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilityTypes, setFacilityTypes] = useState<FacilityType[]>([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [error, setError] = useState("");

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
        if (response.ok) {
          const data = await response.json();
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

    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(facilityToUpdate),
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

  const handleDeleteClick = async (facilityId: string) => {
    console.log(facilityId);
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setFacilities((prevFacilities) =>
          prevFacilities.filter((facility) => facility.id !== facilityId)
        );
        setDeleteSuccessMessage("Facility deleted successfully.");
      } else {
        setError("Error deleting facility");
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
      setError("Error deleting facility");
    }
  };

  return (
    <Container>
      <p>{deleteSuccessMessage}</p>
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
              <tr key={facility.id}>
                <TableData>{facility.id}</TableData>
                <TableData>
                  <input
                    type="text"
                    value={facility.name}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "name", e.target.value)
                    }
                  />
                </TableData>
                <TableData>
                  <input
                    type="text"
                    value={facility.description}
                    onChange={(e) =>
                      handleFieldChange(
                        facility.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </TableData>
                <TableData>
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
                </TableData>
                <TableData>
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
                </TableData>
                <TableData>
                  <input
                    type="text"
                    value={facility.address}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "address", e.target.value)
                    }
                  />
                </TableData>
                <TableData>
                  <input
                    type="text"
                    value={facility.price}
                    onChange={(e) =>
                      handleFieldChange(facility.id, "price", e.target.value)
                    }
                  />
                </TableData>
                <TableData>
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
                </TableData>
                <TableData>
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
                </TableData>
                <TableData>
                  <Update onClick={() => handleUpdateClick(facility.id)}>
                    Update
                  </Update>
                  <Delete onClick={() => handleDeleteClick(facility.id)}>
                    Delete
                  </Delete>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ObjectsTable;
