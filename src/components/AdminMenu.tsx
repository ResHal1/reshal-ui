import React, { useState } from "react";
import styled from "styled-components";
import UsersTable from "./UsersTable";
import ObjectsForm from "./ObjectsForm";
import ObjectTypesForm from "./ObjectTypesForm";
import ObjectsTable from "./ObjectsTable";
import Ownership from "./Ownership";
import ReservationsTable from "./ReservationsTable";

const MenuContainer = styled.div`
  width: 1024px;

  margin: 24px auto;
  justify-content: space-between;
  display: flex;
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
          onClick={() => handleItemClick("objects")}
          style={{ fontWeight: activeItem === "objects" ? "bold" : "normal" }}
        >
          Objects
        </MenuItem>

        <MenuItem
          onClick={() => handleItemClick("add objects")}
          style={{
            fontWeight: activeItem === "add objects" ? "bold" : "normal",
          }}
        >
          Create Objects
        </MenuItem>
        <MenuItem
          onClick={() => handleItemClick("add objects types")}
          style={{
            fontWeight: activeItem === "add objects types" ? "bold" : "normal",
          }}
        >
          Create Object Types
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
        <MenuItem
          onClick={() => handleItemClick("ownership")}
          style={{ fontWeight: activeItem === "ownership" ? "bold" : "normal" }}
        >
          Ownership
        </MenuItem>
      </MenuContainer>
      {activeItem === "add objects types" && <ObjectTypesForm />}
      {activeItem === "objects" && <ObjectsTable />}
      {activeItem === "add objects" && <ObjectsForm />}
      {activeItem === "reservations" && <ReservationsTable />}
      {activeItem === "users" && <UsersTable />}
      {activeItem === "ownership" && <Ownership />}
    </>
  );
};

export default AdminMenu;
