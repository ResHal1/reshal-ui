import React, { useState } from "react";
import ReservationInformation from "../components/ReservationInformation";
import ReservationPersonalInformation from "../components/ReservationPersonalInformation";
import ReservatioPaymentProcess from "../components/ReservatioPaymentProcess";
import Menu from "../components/Menu";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";
import BgImg from "../img/Green_bg4.webp";

const BookingProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: ${MAIN_COLORS.green};
    z-index: -1;
  }
`;

const Step = styled.div<{ active: boolean }>`
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? `${MAIN_COLORS.green}` : `${MAIN_COLORS.white}`};
  color: ${(props) =>
    props.active ? `${MAIN_COLORS.white}` : `${MAIN_COLORS.green}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${MAIN_COLORS.green};
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const BookingProcess = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ReservationInformation nextStep={nextStep} />;
      case 2:
        return (
          <ReservationPersonalInformation
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return <ReservatioPaymentProcess />;
      default:
        return null;
    }
  };

  return (
    <>
      <Menu />
      <BookingProcessContainer>
        <StepContainer>
          <Step active={currentStep === 1} onClick={() => setCurrentStep(1)}>
            1
          </Step>
          <Step active={currentStep === 2} onClick={() => setCurrentStep(2)}>
            2
          </Step>
          <Step active={currentStep === 3} onClick={() => setCurrentStep(3)}>
            3
          </Step>
        </StepContainer>
        {renderStep()}
      </BookingProcessContainer>
      <BackgroundImage src={BgImg} />
    </>
  );
};

export default BookingProcess;
