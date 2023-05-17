import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Green_bg from "../img/Green_bg.webp";
import Hide_Icon from "../img/Hide.webp";
import Header from "../components/Header";
import Image from "../components/GreenBg";
import Label from "../components/Label";
import Button from "../components/FormButton";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
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

const BoxName = styled.div`
  padding: 24px 0px 0px 0px;
`;
const BoxEmail = styled.div`
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

/*Inputs*/

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

/*Buttons*/
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

  const handleRedirectLogin = () => {
    navigate("/login");
  };

  const handleRedirectForgetPassword = () => {
    navigate("/forgetPassword");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const toggleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.live/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        }
      );

      if (response.ok) {
        console.log("registred");
        navigate("/login");
      } else {
        console.error("Registration failed");
        console.log("error");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      console.log("error");
    }
  };

  return (
    <Container>
      <Image img={Green_bg} alt="Green stain" />
      <Wrapper>
        <Header title="Sign up" />
        <Form>
          <BoxEmail>
            <Label htmlFor="Email" text="*Email address" />
            <br />
            <Input type="email" value={email} onChange={handleEmailChange} />
          </BoxEmail>
          <div>
            <LabelIconWrapper>
              <Label htmlFor="Password" text="*Password" />
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
            <BoxName>
              <Label htmlFor="Name" text="*Name" />
              <br />
              <Input type="text" value={name} onChange={handleNameChange} />
            </BoxName>
          </div>
          <Button text="Sign Up" onClick={handleSignUp} />
          <br />
          <ForgetWrapper>
            <ForgetButton onClick={handleRedirectForgetPassword}>
              Forget your password
            </ForgetButton>
            <div>
              <span>Already have an account? </span>
              <ForgetButton onClick={handleRedirectLogin}>Log in</ForgetButton>
            </div>
          </ForgetWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
