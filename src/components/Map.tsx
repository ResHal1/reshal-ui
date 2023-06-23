import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Button from "./FormButton";
import Ball from "../img/Ball.webp";

export default function MapRender() {
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
  margin-top: 30px;
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
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.Marker | null>(null);
  const [selectedMarkerData, setSelectedMarkerData] = useState<any | null>(
    null
  );
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

    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.live/facilities/",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const facilities = await response.json();
        facilities.forEach((facility: any) => {
          const marker = new window.google.maps.Marker({
            position: { lat: facility.lat, lng: facility.lon },
            map: map,
            icon: markerIcon,
          });

          markerRefs.current.set(facility.id, marker);

          marker.addListener("click", () => {
            if (infowindowRef.current) {
              infowindowRef.current.close();
            }
            setSelectedMarker(marker);
            setSelectedMarkerData(facility);
            const infowindow = new google.maps.InfoWindow({
              content: facility.description,
            });
            infowindow.open(map, marker);
            infowindowRef.current = infowindow;
          });
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      removeMarkers();
      google.maps.event.clearListeners(map, "click");
      google.maps.event.clearListeners(map, "dragstart");
    };
  }, [map, markerRefs]);

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
            <HallImg src={selectedMarkerData.imageUrl} alt="Hall Image" />
            <Type>{selectedMarkerData.type.name}</Type>
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
