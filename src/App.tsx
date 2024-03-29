import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgetPassword from "./pages/ForgetPasswordPage";
import ReservationProccessPage from "./pages/ReservationProccessPage";
import MyReservations from "./pages/MyReservationsPage";
import MyAccountPage from "./pages/MyAccountPage";
import AdministratorPage from "./pages/AdministratorPage";
import FacilityPage from "./pages/FacilityPage";
import MyFacilitiesPage from "./pages/MyFacilitiesPage";
import DocumentationPage from "./pages/DocumentationPage";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid #3cb371;
  border-top-color: transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/auth/me",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />

          {isLoggedIn ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/myReservations" element={<MyReservations />} />
              <Route path="/myAccount" element={<MyAccountPage />} />

              <Route
                path="/reservation"
                element={<ReservationProccessPage />}
              />
              <Route path="/facility/:facilityId" element={<FacilityPage />} />
              <Route path="/administrator" element={<AdministratorPage />} />
              <Route path="/myFacilities" element={<MyFacilitiesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
