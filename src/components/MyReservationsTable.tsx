import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TableHeader = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: bold;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const TableCell = styled.div`
  flex: 1;
  text-align: center;
`;

const Message = styled.p`
  color: red;
  display: flex;
  justify-content: center;
`;

interface Reservation {
  startTime: string;
  endTime: string;
  price: string;
  facilityId: string;
  userId: string;
}

interface Facility {
  name: string;
  description: string;
  type: {
    name: string;
  };
}

const Table: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [facilities, setFacilities] = useState<Record<string, Facility>>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/reservations/me",
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
        setReservations(data);

        for (const reservation of data) {
          if (!facilities[reservation.facilityId]) {
            fetchFacilityInfo(reservation.facilityId);
          }
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const fetchFacilityInfo = async (facilityId: string) => {
      try {
        const response = await fetch(
          `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
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
        setFacilities((prevFacilities) => ({
          ...prevFacilities,
          [facilityId]: data,
        }));
      } catch (error) {
        console.error("Error fetching facility information:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <TableContainer>
      <TableHeader>
        <TableHeaderCell>Start Time</TableHeaderCell>
        <TableHeaderCell>End Time</TableHeaderCell>
        <TableHeaderCell>Price</TableHeaderCell>
        <TableHeaderCell>Facility ID</TableHeaderCell>
        <TableHeaderCell>Facility Name</TableHeaderCell>
        <TableHeaderCell>Facility Description</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
      </TableHeader>
      {reservations.length === 0 ? (
        <Message>No reservations yet.</Message>
      ) : (
        reservations.map((reservation: Reservation, index: number) => {
          const facility = facilities[reservation.facilityId];
          const formattedStartTime = formatDate(reservation.startTime);
          const formattedEndTime = formatDate(reservation.endTime);
          return (
            <TableRow key={index}>
              <TableCell>{formattedStartTime}</TableCell>
              <TableCell>{formattedEndTime}</TableCell>
              <TableCell>{reservation.price}</TableCell>
              <TableCell>{reservation.facilityId}</TableCell>

              {facility && (
                <>
                  <TableCell>{facility.name}</TableCell>
                  <TableCell>{facility.description}</TableCell>
                  <TableCell>{facility.type.name}</TableCell>
                </>
              )}
            </TableRow>
          );
        })
      )}
    </TableContainer>
  );
};

export default Table;
