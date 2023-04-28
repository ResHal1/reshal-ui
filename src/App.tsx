import LoginPage from "./pages/LoginPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }

`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <LoginPage />
    </div>
  );
}

export default App;
