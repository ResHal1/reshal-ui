import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationIcon from "../img/LocationIcon.webp";
import Dollar from "../img/Dollar.png";
import Menu from "../components/Menu";
import styled from "styled-components";
import Button from "../components/FormButton";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 48px auto;
  max-width: 800px;
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FacilityImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin-top: 20px;
`;

const FacilityTitle = styled.h2`
  font-size: 24px;
  margin-top: 20px;
`;

const FacilityDescription = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const FacilityInfo = styled.p`
  font-size: 18px;
  margin-top: 10px;
  align-items: center;
  display: flex;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;
const Test = styled.img`
  width: 20px;
  height: 20px;
`;

interface FacilityPageProps {}

interface Facility {
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  price: string;
  type: {
    name: string;
  };
}

const FacilityPage: React.FC<FacilityPageProps> = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const [selectedMarkerData, setSelectedMarkerData] = useState<any | null>(
    null
  );

  useEffect(() => {
    const fetchFacilityInfo = async () => {
      try {
        const response = await fetch(
          `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setSelectedMarkerData(data);
      } catch (error) {
        console.error("Error fetching facility information:", error);
      }
    };

    fetchFacilityInfo();
  }, [facilityId]);
  const navigate = useNavigate();
  const handleRedirectReserve = () => {
    navigate("/reservation", { state: { selectedMarkerData } });
  };

  return (
    <>
      <Menu />
      <PageContainer>
        <h1>Facility Details</h1>
        {selectedMarkerData ? (
          <>
            <FacilityImage
              src={selectedMarkerData.imageUrl}
              alt={selectedMarkerData.name}
            />
            <FacilityTitle>{selectedMarkerData.name}</FacilityTitle>
            <FacilityInfo>
              <Test src={LocationIcon} /> {selectedMarkerData.address}
            </FacilityInfo>
            <FacilityDescription>
              {selectedMarkerData.description}
            </FacilityDescription>
            <FacilityInfo>
              {" "}
              <Test src={Dollar} />
              {selectedMarkerData.price}
            </FacilityInfo>
            <Button text="Reserve" onClick={handleRedirectReserve}></Button>
          </>
        ) : (
          <LoadingMessage>Loading facility information...</LoadingMessage>
        )}
      </PageContainer>
    </>
  );
};

export default FacilityPage;
