import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgetPassword from "./pages/ForgetPasswordPage";
import ReservationsPage from "./pages/ReservationsPage";
import MyAccountPage from "./pages/MyAccountPage";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/myAccount" element={<MyAccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
