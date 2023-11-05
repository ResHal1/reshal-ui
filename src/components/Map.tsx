import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "@googlemaps/react-wrapper";
import Ball from "../img/Ball.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";

export default function MapRender() {
  const apiKey = process.env.REACT_APP_API_KEY || "";
  return (
    <Wrapper apiKey={apiKey} version="beta" libraries={["marker"]}>
      <MyMap />
    </Wrapper>
  );
}

const Container = styled.div`
  flex-direction: column;
  display: flex;
  border-radius: 20px;
  margin: 30px;
  width: 230px;
`;

const Name = styled.h2`
  padding: 0px;
  margin: 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
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

// All markers style

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1024px;
`;

const MarkerContainer = styled.div`
  margin: 15px;
  padding: 15px;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  min-height: 150px;
  min-width: 150px;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
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

function AllMarkers({
  markers,
  selectedMarkerId,
}: {
  markers: any[];
  selectedMarkerId: string | null;
}) {
  const filteredMarkers = markers.filter(
    (markerData: any) => markerData.id !== selectedMarkerId
  );

  return (
    <Row>
      {filteredMarkers.map((markerData: any) => (
        <div
          key={markerData.id}
          style={{
            color: "inherit",
            cursor: "pointer",
            textDecoration: "none",
            width: "calc(35% - 30px)",
          }}
        >
          <MarkerContainer key={markerData.id}>
            <div>
              <Link
                to={`/facility/${markerData.id}`}
                style={{
                  color: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <ImageWrapper>
                  {markerData.images && markerData.images.length > 0 ? (
                    <Image src={markerData.images[0].url} alt="Hall Image" />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </ImageWrapper>
                <Content>
                  <Name>{markerData.name}</Name>
                  <Type>{markerData.type.name}</Type>
                  <Address>{markerData.address}</Address>
                </Content>
                <Price>
                  ${parseFloat(markerData.price)}
                  <Time>/60min</Time>
                </Price>
              </Link>
            </div>
          </MarkerContainer>
        </div>
      ))}
    </Row>
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
  const [allMarkersData, setAllMarkersData] = useState<any[]>([]);
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
          "https://reshal-api.bartoszmagiera.dev/facilities",
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
              content: facility.name,
            });
            infowindow.open(map, marker);
            infowindowRef.current = infowindow;
          });
        });

        setAllMarkersData(facilities);
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
    navigate("/reservation", { state: { selectedMarkerData } });
  };

  return (
    <div>
      <Box>
        {selectedMarkerData ? (
          <div
            style={{ display: "flex", maxWidth: "1024px", margin: "0 auto" }}
          >
            <Link
              key={selectedMarkerData.id}
              to={`/facility/${selectedMarkerData.id}`}
              style={{
                color: "inherit",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Container>
                <ImageWrapper>
                  {selectedMarkerData.images &&
                  selectedMarkerData.images.length > 0 ? (
                    <Image
                      src={selectedMarkerData.images[0].url}
                      alt="Hall Image"
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </ImageWrapper>
                <Name>{selectedMarkerData.name}</Name>
                <Type>{selectedMarkerData.type.name}</Type>
                <Address>{selectedMarkerData.address}</Address>
                <Price>
                  ${parseFloat(selectedMarkerData.price)}
                  <Time>/60min</Time>
                </Price>
              </Container>
            </Link>
            <div style={{ flex: 1 }}>
              <AllMarkers
                markers={allMarkersData}
                selectedMarkerId={selectedMarkerData.id}
              />
            </div>
          </div>
        ) : (
          <AllMarkers markers={allMarkersData} selectedMarkerId={null} />
        )}
      </Box>
    </div>
  );
}
