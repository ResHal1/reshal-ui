import Green_bg from "../img/Green_bg.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";

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

const LoginPage = () => {
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
            <Label htmlFor="password">Password</Label>
            <br />
            <Input type="password"></Input>
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
