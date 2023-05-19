import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Green_bg from "../img/Green_bg.webp";
import Hide_Icon from "../img/Hide.webp";
import Header from "../components/Header";
import Image from "../components/GreenBg";
import Label from "../components/Label";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const Button = styled.button`
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
  cursor: pointer;
  width: 100%;
  padding: 16px 0;
  border-radius: 50px;
  font-size: 22px;
  margin: 24px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 580px;
  z-index: 999;
  width: 40%;
  min-width: 250px;
  max-width: 600px;
  height: 100vh;
`;

const Form = styled.form`
  width: 100%;
  color: ${MAIN_COLORS.greyLight};
`;

const Box = styled.div`
  padding: 24px 0px;
`;

const ForgetWrapper = styled.div`
  display: flex;
  gap: 26px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 26px;
`;
const HideWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 95%;
  height: 56px;
  border: 1px solid ${MAIN_COLORS.greyMiddle};
  border-radius: 20px;
  padding-left: 5%;
  &:focus {
    padding-right: 5%;
    border: 1px solid ${MAIN_COLORS.green};
    outline: none;
  }
`;
const LabelIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForgetButton = styled.button`
  border: none;
  background: none;
  padding: 0px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
`;
const HideBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${MAIN_COLORS.greyMiddle};
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRedirectSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleRedirectForgetPassword = () => {
    navigate("/forgetPassword");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  return (
    <Container>
      <Image img={Green_bg} alt="Green stain" />
      <Wrapper>
        <Header title="Log In" />
        <Form onSubmit={handleLogin}>
          <Box>
            <Label htmlFor="Email" text="Email address" />
            <br />
            <Input type="email" value={email} onChange={handleEmailChange} />
          </Box>
          <div>
            <LabelIconWrapper>
              <Label htmlFor="Password" text="Password" />
              <HideWrapper>
                <HideBtn onClick={toggleShowPassword}>
                  <Icon src={Hide_Icon} alt="Hide Icon"></Icon>
                  {showPassword ? "Hide" : "Show"}
                </HideBtn>
              </HideWrapper>
            </LabelIconWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            ></Input>
          </div>
          <Button>Login</Button>
          <br />
          <ForgetWrapper>
            <ForgetButton onClick={handleRedirectForgetPassword}>
              Forget your password
            </ForgetButton>
            <div>
              <span>Don't have an account? </span>
              <ForgetButton onClick={handleRedirectSignUp}>
                Sign up
              </ForgetButton>
            </div>
          </ForgetWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
