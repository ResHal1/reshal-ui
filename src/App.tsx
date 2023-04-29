import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ForgetPassword from "./pages/ForgetPasswordPage";

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
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/fotgetPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
