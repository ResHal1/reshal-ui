import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import hallExample from "../img/HallExample.webp";
import styled from "styled-components";

export default function MapTest() {
  return (
    <Wrapper
      apiKey="AIzaSyBGde4ydbdGOcKMdN6J9wB82ZS8oiKfp8s"
      version="beta"
      libraries={["marker"]}
    >
      <MyMap />
    </Wrapper>
  );
}

const HallImg = styled.img`
  max-width: 400px;
  max-height: 300px;
`;

const mapOptions = {
  mapId: process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE,
  center: { lat: 52.237049, lng: 21.017532 },
  zoom: 7,
  disableDefaultUI: true,
};

const halData = {
  A: {
    name: "Krakow",
    position: { lat: 50.049683, lng: 19.944544 },
    description: "Siema tutaj hala w Krakowie",
    hallImg: hallExample,
  },
  B: {
    name: "Lodz",
    position: { lat: 51.759445, lng: 19.457216 },
    description: "Siema tutaj hala w Lodzi",
    hallImg: "",
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
      <div style={{ height: "65vh" }} ref={ref} id="map"></div>
      <Weather map={map} markerRefs={markerRefs} />
    </div>
  );
}

function Weather({
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

    Object.entries(data).forEach(([key, weather]) => {
      const marker = new window.google.maps.Marker({
        position: weather.position,
        map: map,
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

  return (
    <div>
      <div>
        {selectedMarkerData && (
          <div>
            <div>{selectedMarkerData.description}</div>
            <HallImg src={selectedMarkerData.hallImg} alt="Hall Image" />
          </div>
        )}
      </div>
    </div>
  );
}
