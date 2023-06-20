import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
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

const ErrorText = styled.div`
  color: red;
  margin-top: 10px;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleRedirectSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/auth/token",
        {
          method: "POST",
          credentials: "include",
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
        console.log("Login successful");
        navigate("/");
      } else {
        console.log("Login failed");
        setError("Incorrect e-mail or password.");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed");
    }
  };
  const handleRedirectForgetPassword = () => {
    navigate("/forgetPassword");
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
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
                  <Icon src={Hide_Icon} alt="Hide Icon" />
                  {showPassword ? "Hide" : "Show"}
                </HideBtn>
              </HideWrapper>
            </LabelIconWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button type="submit">Login</Button>
          {error && <ErrorText>{error}</ErrorText>}
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
