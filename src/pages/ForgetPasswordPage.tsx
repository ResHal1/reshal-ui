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

const Box = styled.div`
  padding: 24px 0px 0px 0px;
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

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <Header title="Forget Password" />
        <Form action="">
          <div>
            <LabelIconWrapper>
              <Label htmlFor="Password" text="New password" />
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
            <Box>
              <Label htmlFor="Password" text="Confirm password" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              ></Input>
            </Box>
          </div>
          <Button text="Continue" onClick={handleRedirectLogin}></Button>
          <br />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
