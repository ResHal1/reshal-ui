import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgetPassword from "./pages/ForgetPasswordPage";
import ReservationProccessPage from "./pages/ReservationProccessPage";
import MyReservations from "./pages/MyReservationsPage";
import MyAccountPage from "./pages/MyAccountPage";

const checkToken = async () => {
  try {
    const response = await fetch(
      "https://reshal-api.bartoszmagiera.live/auth/me",
      {
        method: "GET",
        credentials: "include",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("Authorized");
    } else {
      console.log("Not Authorized");
      // current user bloean false
    }
  } catch (error) {
    // current user bloean false
    console.log(error);
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

function App() {
  checkToken();
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/myReservations" element={<MyReservations />} />
          <Route path="/myAccount" element={<MyAccountPage />} />
          <Route path="/reservation" element={<ReservationProccessPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
