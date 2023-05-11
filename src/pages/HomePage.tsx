import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import MapTest from "../components/Map";

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

      <MapTest></MapTest>
    </div>
  );
};

export default HomePage;
