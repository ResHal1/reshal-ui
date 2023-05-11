import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Map from "../components/Map";

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

      <Map></Map>
    </div>
  );
};

export default HomePage;
