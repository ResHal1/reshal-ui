import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import styled from "styled-components";

const FacilityImage = styled.img`
  width: 600px;
`;

interface FacilityPageProps {}

interface Facility {
  name: string;
  description: string;
  imageUrl: string;
  type: {
    name: string;
  };
}

const FacilityPage: React.FC<FacilityPageProps> = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);

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
        console.log(data);
        setFacility(data);
      } catch (error) {
        console.error("Error fetching facility information:", error);
      }
    };

    fetchFacilityInfo();
  }, [facilityId]);

  return (
    <div>
      <Menu />
      <h1>Facility Details</h1>
      {facility ? (
        <>
          <FacilityImage src={facility.imageUrl}></FacilityImage>
          <h2>{facility.name}</h2>
          <p>{facility.description}</p>
        </>
      ) : (
        <p>Loading facility information...</p>
      )}
    </div>
  );
};

export default FacilityPage;
