import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 1024px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
  padding: 10px;
  background-color: ${MAIN_COLORS.red};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

interface Reservation {
  id: number;
  facilityId: string;
  userId: string;
  startTime: string;
  endTime: string;
}

const ReservationsTable = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
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
    const fetchReservations = async () => {
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
          setReservations(data);
        } else {
          setError("Error fetching reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError("Error fetching reservations");
      }
    };

    fetchReservations();
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
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.facilityId}</TableCell>
                <TableCell>{reservation.userId}</TableCell>
                <TableCell>{reservation.startTime}</TableCell>
                <TableCell>{reservation.endTime}</TableCell>
                <TableCell>
                  <DeleteButton
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
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

export default ReservationsTable;
