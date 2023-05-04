import React from "react";
import Menu from "../components/Menu";

const HomePage = () => {
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
    </div>
  );
};

export default HomePage;