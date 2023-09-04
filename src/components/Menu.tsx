import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonalIcon from "../img/PersonalIcon.webp";
import HomeIcon from "../img/HomeIcon.webp";
import ReservationIcon from "../img/Reservation.webp";
import PersonIcon from "../img/MyAccountIcon.webp";
import LogoutIcon from "../img/Logout.webp";
import AdministratorIcon from "../img/Administrator.webp";
import { MAIN_COLORS } from "../globlaStyle/colors";

interface MenuItemProps {
  label: string;
  link: string;
  onClick?: () => void;
}

interface User {
  id: string;
  name: string;
  role: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  justify-content: space-between;
  margin: auto;
  padding: 0 48px;
`;
const Wrapper = styled.div`
  width: 1024px;
  padding: 0 48px;
  display: flex;
  justify-content: end;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
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
  z-index: 999;
  justify-content: flex-start;
  padding: 0 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuItemLink = styled(NavLink)<{ active: number }>`
  color: ${({ active }) =>
    active ? `${MAIN_COLORS.greyDark}` : `${MAIN_COLORS.black}`};
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  transition: color 0.2s ease-in-out;
  align-items: center;
  display: flex;
`;

const MenuList = styled.ul`
  z-index: 999;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: ${MAIN_COLORS.white};
  border-radius: 5px;
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
    background-color: #eeeeee;
  }
`;

const MenuIcon = styled.img``;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

interface MenuProps {
  items: MenuItemProps[];
}

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://reshal-api.bartoszmagiera.dev/auth/me",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRedirectHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await fetch("https://reshal-api.bartoszmagiera.dev/auth/logout", {
        method: "GET",
        credentials: "include",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  const items = [
    {
      label: "Home",
      link: "/",
      icon: HomeIcon,
    },
    {
      label: "Administrator",
      link: "/administrator",
      icon: AdministratorIcon,
    },
    {
      label: "Reservations",
      link: "/myReservations",
      icon: ReservationIcon,
    },
    {
      label: "My Account",
      link: "/myAccount",
      icon: PersonIcon,
    },

    {
      label: "Logout",
      link: "/login",
      icon: LogoutIcon,
      onClick: handleLogout,
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
      <Main>
        <Wrapper>
          {isOpen && (
            <MenuList ref={menuRef}>
              {items.map((item, index) => {
                const isAdmin = user?.role === "admin";
                if (item.label === "Administrator" && !isAdmin) {
                  return null;
                }

                return (
                  <MenuItemContainer key={index}>
                    {item.onClick ? (
                      <MenuItemLink
                        to={item.link}
                        active={window.location.pathname === item.link ? 1 : 0}
                        onClick={() => {
                          item.onClick?.();
                          handleMenuItemClick();
                        }}
                      >
                        {item.icon && <Icon src={item.icon} />} {item.label}
                      </MenuItemLink>
                    ) : (
                      <MenuItemLink
                        to={item.link}
                        active={window.location.pathname === item.link ? 1 : 0}
                        onClick={handleMenuItemClick}
                      >
                        {item.icon && <Icon src={item.icon} />} {item.label}
                      </MenuItemLink>
                    )}
                  </MenuItemContainer>
                );
              })}
            </MenuList>
          )}
        </Wrapper>
      </Main>
    </nav>
  );
};

export default Menu;
