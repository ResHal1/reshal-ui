import React, { useState } from "react";
import styled from "styled-components";
import UsersTable from "./UsersTable";
import ObjectsForm from "./ObjectsForm";
import ObjectTypesForm from "./ObjectTypesForm";

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

const AdminMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("objects");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <MenuContainer>
        <MenuItem
          onClick={() => handleItemClick("add objects")}
          style={{
            fontWeight: activeItem === "add objects" ? "bold" : "normal",
          }}
        >
          Add Objects
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("objects")}
          style={{ fontWeight: activeItem === "objects" ? "bold" : "normal" }}
        >
          Objects
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("objects types")}
          style={{
            fontWeight: activeItem === "objects types" ? "bold" : "normal",
          }}
        >
          Object Types
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
      {activeItem === "add objects" && <ObjectsForm />}
      {activeItem === "objects" && <h1>Objects</h1>}
      {activeItem === "objects types" && <ObjectTypesForm />}
      {activeItem === "reservations" && <h2>Reservations Form</h2>}
      {activeItem === "users" && <UsersTable />}
    </>
  );
};

export default AdminMenu;
