import React, { useState, useEffect } from "react";
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

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/auth",
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
          {users.map((user) => (
            <tr key={user.id}>
              <TableData>{user.id}</TableData>
              <TableData>{user.firstName}</TableData>
              <TableData>{user.lastName}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.role}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
