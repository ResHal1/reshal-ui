import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
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

interface Facility {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  typeId: string;
  price: number;
  lon: number;
  lat: number;
}

const ObjectsTable: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/facilities/admin",
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
            console.log(data);
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

    fetchFacilities();
  }, []);

  const updateFacility = async (
    facilityId: number,
    updatedFields: Partial<Facility>
  ) => {
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.live/facilities/${facilityId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        }
      );
      if (response.ok) {
        setFacilities((prevFacilities) => {
          const updatedFacilities = [...prevFacilities];
          const facilityIndex = updatedFacilities.findIndex(
            (facility) => facility.id === facilityId
          );
          if (facilityIndex !== -1) {
            updatedFacilities[facilityIndex] = {
              ...updatedFacilities[facilityIndex],
              ...updatedFields,
            };
          }
          return updatedFacilities;
        });
        console.log("Facility updated successfully");
      } else {
        console.error("Error updating facility:", response.statusText);
        setError("Error updating facility");
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      setError("Error updating facility");
    }
  };

  const deleteFacility = async (facilityId: number) => {
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.live/facilities/${facilityId}`,
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
        console.log("Facility deleted successfully");
      } else {
        console.error("Error deleting facility:", response.statusText);
        setError("Error deleting facility");
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
      setError("Error deleting facility");
    }
  };

  const handleUpdateClick = (facilityId: number) => {
    const facilityToUpdate = facilities.find(
      (facility) => facility.id === facilityId
    );

    if (facilityToUpdate) {
      updateFacility(facilityId, {
        name: facilityToUpdate.name,
        imageUrl: facilityToUpdate.imageUrl,
        lat: facilityToUpdate.lat,
        lon: facilityToUpdate.lon,
        description: facilityToUpdate.description,
        price: facilityToUpdate.price,
        typeId: facilityToUpdate.typeId,
      });
    }
  };

  const handleDeleteClick = (facilityId: number) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      deleteFacility(facilityId);
    }
  };

  const handleFieldChange = (
    facilityId: number,
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

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Facility ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Image</TableHeader>
          <TableHeader>Latitude</TableHeader>
          <TableHeader>Longitude</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>TypeId</TableHeader>
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
                value={facility.imageUrl}
                onChange={(e) =>
                  handleFieldChange(facility.id, "imageUrl", e.target.value)
                }
              />
            </TableData>
            <TableData>
              <input
                type="number"
                value={facility.lat}
                onChange={(e) =>
                  handleFieldChange(facility.id, "lat", e.target.valueAsNumber)
                }
              />
            </TableData>
            <TableData>
              <input
                type="number"
                value={facility.lon}
                onChange={(e) =>
                  handleFieldChange(facility.id, "lon", e.target.valueAsNumber)
                }
              />
            </TableData>
            <TableData>
              <input
                type="text"
                value={facility.description}
                onChange={(e) =>
                  handleFieldChange(facility.id, "description", e.target.value)
                }
              />
            </TableData>
            <TableData>
              <input
                type="number"
                value={facility.price}
                onChange={(e) =>
                  handleFieldChange(
                    facility.id,
                    "price",
                    e.target.valueAsNumber
                  )
                }
              />
            </TableData>
            <TableData>
              <input
                type="string"
                value={facility.typeId}
                onChange={(e) =>
                  handleFieldChange(
                    facility.id,
                    "typeId",
                    e.target.valueAsNumber
                  )
                }
              />
            </TableData>
            <TableData>
              <button onClick={() => handleUpdateClick(facility.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteClick(facility.id)}>
                Delete
              </button>
            </TableData>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ObjectsTable;
