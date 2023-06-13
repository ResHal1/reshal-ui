import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgetPassword from "./pages/ForgetPasswordPage";
import ReservationProccessPage from "./pages/ReservationProccessPage";
import MyReservations from "./pages/MyReservationsPage";
import MyAccountPage from "./pages/MyAccountPage";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/auth/me",
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
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/myReservations" element={<MyReservations />} />
          <Route path="/myAccount" element={<MyAccountPage />} />
          <Route path="/reservation" element={<ReservationProccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
