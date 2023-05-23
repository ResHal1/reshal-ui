import React from "react";
import styled from "styled-components";

const tableData = [
  {
    Address: "123 Main St",
    Status: "Active",
    Name: "John Doe",
    Date: "2023-05-10",
  },
  {
    Address: "456 Elm St",
    Status: "Inactive",
    Name: "Jane Smith",
    Date: "2023-05-12",
  },
];

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

interface TableRowData {
  Address: string;
  Status: string;
  Name: string;
  Date: string;
}

const Table: React.FC = () => {
  const handleAccept = (name: string) => {
    console.log(`Accepted: ${name}`);
  };

  const handleDecline = (name: string) => {
    console.log(`Declined: ${name}`);
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableHeaderCell>Address</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Date</TableHeaderCell>
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableHeader>
      {tableData.map((row: TableRowData, index: number) => (
        <TableRow key={index}>
          <TableCell>{row.Address}</TableCell>
          <TableCell>{row.Status}</TableCell>
          <TableCell>{row.Name}</TableCell>
          <TableCell>{row.Date}</TableCell>
          <TableCell>
            <ActionButton isAccept onClick={() => handleAccept(row.Name)}>
              Accept
            </ActionButton>
            <ActionButton onClick={() => handleDecline(row.Name)}>
              Decline
            </ActionButton>
          </TableCell>
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default Table;
