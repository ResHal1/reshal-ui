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

  const handleDeleteReservation = async (reservationId: number) => {
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.dev/reservations/${reservationId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // Assuming you want to refresh the reservations after deletion
        const updatedReservations = reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        setReservations(updatedReservations);
      } else {
        setError("Error deleting reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError("Error deleting reservation");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ... (previous code)
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
              <TableHeader>Delete Reservation</TableHeader>
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
                <TableData>
                  <button
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
                    Delete
                  </button>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReservationsTable;
