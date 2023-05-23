import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonalIcon from "../img/PersonalIcon.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";
import Background from "../img/Green_bg3.webp";

interface MenuItemProps {
  label: string;
  link: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
`;
const BackgroundImage = styled.img`
  position: absolute;
  z-index: 999;
  transform: scaleX(-1);
  top: 0;
  right: 0px;
`;
const MenuHome = styled.button`
  color: ${MAIN_COLORS.green};
  background: none;
  border: none;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
`;

const MenuItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
`;

const MenuItemLink = styled(NavLink)<{ active: number }>`
  color: ${({ active }) =>
    active ? `${MAIN_COLORS.white}` : `${MAIN_COLORS.black}`};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${MAIN_COLORS.white};
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
  width: auto;
  max-width: 600px;
  min-width: 180px;
`;

const MenuToggle = styled.button`
  border: none;
  background-color: ${MAIN_COLORS.white};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${MAIN_COLORS.lightGrey};
  }
`;

const MenuIcon = styled.img``;

interface MenuProps {
  items: MenuItemProps[];
}

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRedirectHome = () => {
    navigate("/");
  };

  const items = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Reservations",
      link: "/myReservations",
    },
    {
      label: "My Account",
      link: "/myAccount",
    },
    {
      label: "Logout",
      link: "/login",
    },
  ];

  return (
    <nav>
      <Container>
        <MenuHome onClick={handleRedirectHome}>ResHal</MenuHome>
        <MenuToggle onClick={toggleMenu}>
          <MenuIcon src={PersonalIcon} />
        </MenuToggle>
      </Container>
      {isOpen && (
        <MenuList>
          <BackgroundImage src={Background}></BackgroundImage>
          {items.map((item, index) => (
            <MenuItemContainer key={index}>
              <MenuItemLink
                to={item.link}
                active={window.location.pathname === item.link ? 1 : 0}
              >
                {item.label}
              </MenuItemLink>
            </MenuItemContainer>
          ))}
        </MenuList>
      )}
    </nav>
  );
};

export default Menu;
