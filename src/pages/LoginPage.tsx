import Green_bg from "../img/Green_bg.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";
import Hide_Icon from "../img/Hide.webp";
import React, { useState } from "react";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  position: absolute;
  display: flex;
  left: 0;
  z-index: 1;
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

const Title = styled.h1`
  color: ${MAIN_COLORS.greyDark};
  font-size: 32px;
  letter-spacing: 1px;
  width: 100%;
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
/*INPTS*/
const Label = styled.label`
  font-size: 16px;
  line-height: 24px;
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

/*BTNS*/
const LoginButton = styled.button`
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
`;

const LoginPage = () => {
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
      <Img src={Green_bg} alt="Green stain"></Img>
      <Wrapper>
        <Title>Log in</Title>
        <Form action="">
          <Box>
            <Label htmlFor="email">Email address</Label>
            <br />
            <Input type="email"></Input>
          </Box>
          <div>
            <LabelIconWrapper>
              <Label htmlFor="password">Password</Label>
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
          <LoginButton>Log In</LoginButton>
          <br />
          <ForgetWrapper>
            <ForgetButton>Forget your password</ForgetButton>
            <div>
              <span>Don't have an account? </span>
              <ForgetButton>Sign up</ForgetButton>
            </div>
          </ForgetWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
