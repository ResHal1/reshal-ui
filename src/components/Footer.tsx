import React from "react";
import styled from "styled-components";
import FooterPlain from "../img/Green_bg4.webp";

const items = [
  {
    label: "Home",
    link: "/",
  },

  {
    label: "My Account",
    link: "/myAccount",
  },
  {
    label: "Reservations",
    link: "/myReservations",
  },

  {
    label: "Documenation",
    link: "/documentation",
  },
];

const FooterBg = styled.img`
  bottom: 0;
  right: 0;
  min-height: 250px;
  object-fit: cover;
  position: absolute;
  z-index: -1;
`;

const TextOverlay = styled.div`
  position: relative;
  bottom: 20px;
  right: 100px;
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  margin: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  min-height: 250px;
  position: relative;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <Container>
      <FooterBg src={FooterPlain} />
      <TextOverlay>
        {items.map((item, index) => (
          <Link key={index} href={item.link}>
            {item.label}
          </Link>
        ))}
        <br />© 2023 Tomasz Topór All Rights Reserved
      </TextOverlay>
    </Container>
  );
};

export default Footer;
