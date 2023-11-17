import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationIcon from "../img/LocationIcon.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";
import ArrowL from "../img/ArrowLeft.png";
import ArrowR from "../img/ArrowRight.png";
import DollarIcon from "../img/Dollar.png";
import TypeIcon from "../img/Pitch.png";
import DescriptionIcon from "../img/Description.png";
import Menu from "../components/Menu";
import styled from "styled-components";
import Button from "../components/FormButton";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 48px auto;
  max-width: 800px;
  padding: 20px;
  min-height: 67vh;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Box = styled.div`
  padding: 20px 100px;
`;

const Price = styled.h3`
  color: ${MAIN_COLORS.green};
  font-size: 30px;
  margin: 0;
  align-items: center;
  display: flex;
  gap: 10px;
`;
const Time = styled.span`
  font-size: 18px;
`;
const Type = styled.span``;

const FacilityImage = styled.img`
  width: 600px;
  height: 400px;
  max-width: 100%;
  border-radius: 8px;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const FacilityDescription = styled.p`
  font-size: 16px;
  margin-top: 0;
`;

const FacilityInfo = styled.p`
  font-size: 18px;
  margin-top: 10px;
  align-items: center;
  display: flex;
  gap: 10px;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const ArrowImage = styled.img`
  width: 50px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

interface FacilityPageProps {}

interface Facility {
  name: string;
  description: string;
  images: { url: string }[];
  address: string;
  price: string;
  type: {
    name: string;
  };
}

const FacilityPage: React.FC<FacilityPageProps> = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const [selectedMarkerData, setSelectedMarkerData] = useState<Facility | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        const data: Facility = await response.json();
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextImage = () => {
    if (selectedMarkerData?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < selectedMarkerData.images.length - 1
          ? prevIndex + 1
          : prevIndex
      );
    }
  };

  return (
    <>
      <Menu />
      <PageContainer>
        {selectedMarkerData ? (
          <>
            <Title>{selectedMarkerData?.name}</Title>
            <SliderContainer>
              <ArrowButton onClick={handlePrevImage}>
                <ArrowImage src={ArrowL} alt="Previous" />
              </ArrowButton>
              {selectedMarkerData.images && (
                <FacilityImage
                  src={selectedMarkerData?.images[currentImageIndex].url}
                  alt={selectedMarkerData?.name}
                />
              )}
              <ArrowButton onClick={handleNextImage}>
                <ArrowImage src={ArrowR} alt="Next" />
              </ArrowButton>
            </SliderContainer>
            <Box>
              <FacilityInfo>
                <Icon src={TypeIcon} />
                <Type>{selectedMarkerData?.type.name}</Type>
              </FacilityInfo>
              <FacilityInfo>
                <Icon src={LocationIcon} /> {selectedMarkerData?.address}
              </FacilityInfo>
              <Wrapper>
                <Icon src={DescriptionIcon} />
                <FacilityDescription>
                  {selectedMarkerData?.description}
                </FacilityDescription>
              </Wrapper>
              <FacilityInfo>
                {" "}
                <Price>
                  <Icon src={DollarIcon} />
                  <div>
                    {parseInt(selectedMarkerData?.price)}
                    <Time>/60min</Time>
                  </div>
                </Price>
              </FacilityInfo>
            </Box>
            <ButtonWrapper>
              <Button text="Reserve" onClick={handleRedirectReserve}></Button>
            </ButtonWrapper>
          </>
        ) : (
          <LoadingMessage>Loading facility information...</LoadingMessage>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};

export default FacilityPage;
