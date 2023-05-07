import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

interface IMapProps {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  height: 80vh;
  width: 100%;
`;

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMapProps> = ({ mapType, mapTypeControl = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap | undefined>(undefined);

  useEffect(() => {
    const defaultMapStart = (): void => {
      const defaultAddress = new google.maps.LatLng(52.237049, 21.017532);
      initMap(7, defaultAddress);
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
      if (ref.current) {
        setMap(
          new google.maps.Map(ref.current, {
            zoom: zoomLevel,
            center: address,
            mapTypeControl: mapTypeControl,
            streetViewControl: false,
            rotateControl: false,
            scaleControl: true,
            fullscreenControl: false,
            panControl: false,
            zoomControl: true,
            gestureHandling: "cooperative",
            mapTypeId: mapType,
            draggableCursor: "pointer",
          })
        );
      }
    };

    if (!map) {
      defaultMapStart();
    }
  }, [map, mapType, mapTypeControl]);

  return (
    <Container>
      <MapContainer ref={ref} />
    </Container>
  );
};

export default Map;
