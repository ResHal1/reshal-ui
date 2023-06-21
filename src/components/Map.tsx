import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Button from "./FormButton";
import HallExample from "../img/HallExample.webp";
import HallExample2 from "../img/Hall2.jpg";
import Ball from "../img/Ball.webp";

export default function MapTest() {
  const apiKey = process.env.REACT_APP_API_KEY || "";
  return (
    <Wrapper apiKey={apiKey} version="beta" libraries={["marker"]}>
      <MyMap />
    </Wrapper>
  );
}

const HallImg = styled.img`
  width: 100%;
  max-height: 175px;
`;

const Description = styled.h2`
  padding: 0px;
  margin: 0px;
`;

const Price = styled.h3`
  color: ${MAIN_COLORS.green};
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;

const Address = styled.span`
  font-size: 16px;
  color: ${MAIN_COLORS.greyLight};
`;

const Time = styled.span`
  font-size: 18px;
`;

const Type = styled.span``;

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  flex-direction: column;
  display: flex;
  border: 1px solid ${MAIN_COLORS.lightGrey};
  border-radius: 20px;
  padding: 10px;
  width: 50%;
  max-width: 600px;
`;

const mapOptions = {
  mapId: process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE,
  center: { lat: 52.237049, lng: 21.017532 },
  zoom: 7,
  disableDefaultUI: true,
};

const halData = {
  A: {
    id: "",
    name: "Krakow",
    position: { lat: 50.049683, lng: 19.944544 },
    description: "Hala w Krakowie",
    type: "Hala",
    address: "Ulica kalwarysjka 54, 31-100 Słupsk",
    hallImg: HallExample,
    price: 40,
  },
  B: {
    id: "",
    name: "Łódź",
    position: { lat: 51.759445, lng: 19.457216 },
    description: "Hala w Łodzi",
    type: "Orlik",
    address: "Ulica Adama Mickiewicza 54, 31-100 Radomsko",
    hallImg: HallExample2,
    price: 60,
  },
};

function MyMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRefs = useRef<Map<string, google.maps.Marker>>(new Map());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

  return (
    <div>
      <div style={{ height: "60vh" }} ref={ref} id="map"></div>
      <MapSettings map={map} markerRefs={markerRefs} />
    </div>
  );
}

function MapSettings({
  map,
  markerRefs,
}: {
  map: google.maps.Map | null;
  markerRefs: React.MutableRefObject<Map<string, google.maps.Marker>>;
}) {
  const [data, setData] = useState(halData);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.Marker | null>(null);
  const [selectedMarkerData, setSelectedMarkerData] = useState<
    (typeof halData)[keyof typeof halData] | null
  >(null);
  const infowindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const removeMarkers = (): void => {
      markerRefs.current.forEach((marker) => {
        marker.setMap(null);
      });
      markerRefs.current.clear();
    };

    const hideDescription = (): void => {
      if (infowindowRef.current) {
        infowindowRef.current.close();
        setSelectedMarker(null);
        setSelectedMarkerData(null);
      }
    };

    const handleMarkerClose = (): void => {
      hideDescription();
    };

    if (!map) {
      removeMarkers();
      return;
    }

    const markerIcon = {
      url: Ball,
      scaledSize: new google.maps.Size(35, 35),
    };

    Object.entries(data).forEach(([key, weather]) => {
      const marker = new window.google.maps.Marker({
        position: weather.position,
        map: map,
        icon: markerIcon,
      });

      markerRefs.current.set(key, marker);

      marker.addListener("click", () => {
        if (infowindowRef.current) {
          infowindowRef.current.close();
        }
        setSelectedMarker(marker);
        setSelectedMarkerData(weather);
        const infowindow = new google.maps.InfoWindow({
          content: weather.description,
        });
        infowindow.open(map, marker);
        infowindowRef.current = infowindow;
      });
    });

    const handleMapClick = (): void => {
      hideDescription();
    };

    const handleMapDragStart = (): void => {
      hideDescription();
    };

    google.maps.event.addListener(map, "click", handleMapClick);
    google.maps.event.addListener(map, "dragstart", handleMapDragStart);

    return () => {
      removeMarkers();
      google.maps.event.clearListeners(map, "click");
      google.maps.event.clearListeners(map, "dragstart");
    };
  }, [map, data, markerRefs]);

  const navigate = useNavigate();

  const handleRedirectReserve = () => {
    navigate("/reservation");
  };

  return (
    <div>
      <Box>
        {selectedMarkerData && (
          <Container>
            <Description>{selectedMarkerData.description}</Description>
            <HallImg src={selectedMarkerData.hallImg} alt="Hall Image" />
            <Type>{selectedMarkerData.type}</Type>
            <Address>{selectedMarkerData.address}</Address>
            <Price>
              ${selectedMarkerData.price}
              <Time>/60min</Time>
            </Price>
            <Button text="Reserve" onClick={handleRedirectReserve}></Button>
          </Container>
        )}
      </Box>
    </div>
  );
}
