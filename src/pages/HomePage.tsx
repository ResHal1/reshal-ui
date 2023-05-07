import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { loadMapApi } from "../components/utilis/GoogleMapsUtilis";
import Map from "../components/Map";

const HomePage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

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
      {scriptLoaded && (
        <Map
          mapType={google.maps.MapTypeId.ROADMAP}
          mapTypeControl={true}
        ></Map>
      )}
    </div>
  );
};

export default HomePage;
