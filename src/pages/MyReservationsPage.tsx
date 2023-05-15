import React from "react";
import Menu from "../components/Menu";
import ReservationsTable from "../components/ReservationsTable";

const ReservationsPage = () => {
  const items = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Reservations",
      link: "/reservations",
    },
    {
      label: "My Account",
      link: "/myAccount",
    },
  ];
  return (
    <div>
      <Menu items={items} />
      <ReservationsTable />
    </div>
  );
};

export default ReservationsPage;
