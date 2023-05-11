import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
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
      <div style={{ height: "70vh" }} ref={ref} id="map"></div>
      <Weather map={map} markerRefs={markerRefs} />
    </div>
  );
}

type MarkerProps = {
  map: google.maps.Map | null;
  children: React.ReactNode;
  position: google.maps.LatLngLiteral;
  description: string;
};

const halData = {
  A: {
    name: "Krakow",
    position: { lat: 50.049683, lng: 19.944544 },
    description: "Siema tutaj hala w Krakowie",
  },
  B: {
    name: "Lodz",
    position: { lat: 51.759445, lng: 19.457216 },
    description: "Siema tutaj hala w Lodzi",
  },
};

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
  const [selectedMarkerDescription, setSelectedMarkerDescription] =
    useState("");
  const [showDescription, setShowDescription] = useState(false);
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
        setSelectedMarkerDescription("");
        setShowDescription(false);
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

      const infowindow = new window.google.maps.InfoWindow({
        content: weather.description,
      });

      marker.addListener("click", () => {
        if (infowindowRef.current) {
          infowindowRef.current.close();
        }
        infowindow.open(map, marker);
        setSelectedMarker(marker);
        setSelectedMarkerDescription(weather.description);
        setShowDescription(true);
        infowindowRef.current = infowindow;
      });

      infowindow.addListener("closeclick", () => {
        handleMarkerClose();
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
        {showDescription && selectedMarker && (
          <div>{selectedMarkerDescription}</div>
        )}
      </div>
    </div>
  );
}
