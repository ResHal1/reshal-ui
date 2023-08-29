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

const ActionButton = styled.button<{ isAccept?: boolean }>`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isAccept ? "#5cb85c" : "#d9534f")};
  color: #fff;
  border: none;
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

const Table: React.FC = () => {
  const [userRole, setUserRole] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleAccept = (userId: string) => {
    console.log(`Accepted user with ID: ${userId}`);
  };

  const handleDecline = (userId: string) => {
    console.log(`Declined user with ID: ${userId}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/auth/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

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
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchUserData();
    fetchReservations();
  }, []);

  return (
    <TableContainer>
      <TableHeader>
        <TableHeaderCell>Start Time</TableHeaderCell>
        <TableHeaderCell>End Time</TableHeaderCell>
        <TableHeaderCell>Price</TableHeaderCell>
        <TableHeaderCell>Facility ID</TableHeaderCell>
        <TableHeaderCell>User ID</TableHeaderCell>
        {userRole === "owner" && <TableHeaderCell>Actions</TableHeaderCell>}
      </TableHeader>
      {reservations.length === 0 ? (
        <Message>No reservations yet.</Message>
      ) : (
        reservations.map((row: Reservation, index: number) => (
          <TableRow key={index}>
            <TableCell>{row.startTime}</TableCell>
            <TableCell>{row.endTime}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.facilityId}</TableCell>
            <TableCell>{row.userId}</TableCell>
            {userRole === "owner" ? (
              <TableCell>
                <ActionButton isAccept onClick={() => handleAccept(row.userId)}>
                  Accept
                </ActionButton>
                <ActionButton onClick={() => handleDecline(row.userId)}>
                  Decline
                </ActionButton>
              </TableCell>
            ) : null}
          </TableRow>
        ))
      )}
    </TableContainer>
  );
};

export default Table;
