import React from "react";
import Green_bg from "../img/Green_bg.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 600px;
  position: absolute;
  display: flex;
  left: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 580px;
  z-index: 999;
  height: 100vh;
`;

/*BTNS*/
const LoginButton = styled.button`
  background: ${MAIN_COLORS.green};
  border: none;
  color: ${MAIN_COLORS.white};
`;
const ForgetButton = styled.button`
  border: none;
  background: none;
  padding: 0px;
  font-size: 16px;
`;

const LoginPage = () => {
  return (
    <Container>
      <Img src={Green_bg} alt="Green stain"></Img>
      <Wrapper>
        <h1>Log in</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email"></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password"></input>
          </div>
          <LoginButton>Log In</LoginButton>
          <br />
          <ForgetButton>Forget your password</ForgetButton>
          <div>
            <span>Don't have an account? </span>
            <ForgetButton>Sign up</ForgetButton>
          </div>
        </form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
