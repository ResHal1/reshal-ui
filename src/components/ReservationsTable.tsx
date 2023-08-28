import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  margin: 20px;
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
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const ReservationsTable = () => {
  const [reservations, setReservations] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/reservations",
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
    <TableContainer>
      <h2>Users Table</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Id</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <TableData>{reservation.id}</TableData>
              {/* <TableData>{reservation.firstName}</TableData>
            <TableData>{reservation.lastName}</TableData>
            <TableData>{reservation.email}</TableData>
            <TableData>{reservation.role}</TableData> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ReservationsTable;
