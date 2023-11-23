import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 956px;
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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/auth",
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
            setUsers(data);
          } else {
            setError("Invalid data format");
          }
        } else {
          setError("Error fetching users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
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
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersTable;
