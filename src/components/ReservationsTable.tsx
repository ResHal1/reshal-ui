import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  margin: 20px;
  max-width: 1024px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #000;
`;

const TableData = styled.td`
  padding: 10px;
  border: 1px solid #000;
`;

interface User {
  id: number;
  facilityId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

const ReservationsTable = () => {
  const [reservations, setReservations] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/reservations",
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
            setReservations(data);
          } else {
            setError("Invalid data format");
          }
        } else {
          setError("Error fetching reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Error fetching reservations");
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Id</TableHeader>
              <TableHeader>Facility Id</TableHeader>
              <TableHeader>User Id</TableHeader>
              <TableHeader>Start Time</TableHeader>
              <TableHeader>End Time</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <TableData>{reservation.id}</TableData>
                <TableData>{reservation.facilityId}</TableData>
                <TableData>{reservation.userId}</TableData>
                <TableData>{reservation.startTime}</TableData>
                <TableData>{reservation.endTime}</TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReservationsTable;
