import React, { useState } from "react";
import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";
import Menu from "../components/Menu";
import Background from "../img/Green_bg5.webp";
import Profile_Icon from "../img/Profile_Icon.webp";
import Hide_Icon from "../img/Hide.webp";
import Label from "../components/Label";

const apiUrl = "https://reshal-api.bartoszmagiera.live/api/auth/me";

const BackgroundImage = styled.img`
  width: 100%;
  height: 250px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const ProfileIcon = styled.img`
  align-items: center;
  display: flex;
  margin: -100px auto;
`;

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
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

const HideWrapper = styled.div`
  display: flex;
`;

const LabelIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HideBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${MAIN_COLORS.greyMiddle};
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

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const MyAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, password }),
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully.");
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the profile.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Menu />
      <BackgroundImage src={Background} />
      <ProfileIcon src={Profile_Icon} />
      <Container>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="First Name" text="First Name" />
          <Input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />

          <Label htmlFor="Last Name" text="Last Name" />
          <Input type="text" value={lastName} onChange={handleLastNameChange} />

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

          <Button type="submit">Submit</Button>
        </form>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};

export default MyAccountPage;
