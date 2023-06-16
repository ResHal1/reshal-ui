import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const MenuItem = styled.button`
  text-decoration: none;
  color: #000;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #888;
  }
`;

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
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/auth/",
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
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Email</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableData>{user.firstName}</TableData>
              <TableData>{user.lastName}</TableData>
              <TableData>{user.email}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

const AdminMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("objects");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <MenuContainer>
        <MenuItem
          onClick={() => handleItemClick("objects")}
          style={{ fontWeight: activeItem === "objects" ? "bold" : "normal" }}
        >
          Objects
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("reservations")}
          style={{
            fontWeight: activeItem === "reservations" ? "bold" : "normal",
          }}
        >
          Reservations
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("users")}
          style={{ fontWeight: activeItem === "users" ? "bold" : "normal" }}
        >
          Users
        </MenuItem>
      </MenuContainer>
      {activeItem === "objects" && <h2>Objects Form</h2>}
      {activeItem === "reservations" && <h2>Reservations Form</h2>}
      {activeItem === "users" && <UsersTable />}
    </>
  );
};

export default AdminMenu;
