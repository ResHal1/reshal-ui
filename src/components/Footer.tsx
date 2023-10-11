import React from "react";
import styled from "styled-components";
import FooterPlain from "../img/Green_bg4.webp";

const items = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Administrator",
    link: "/administrator",
  },
  {
    label: "Reservations",
    link: "/myReservations",
  },
  {
    label: "My Account",
    link: "/myAccount",
  },
];

const FooterBg = styled.img`
  bottom: 0;
  right: 0;
  width: 67%;
  min-width: 65%;
  min-height: 300px;
  object-fit: cover;
  position: absolute;
`;

const TextOverlay = styled.div`
  position: absolute;
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
  width: 100%;
  height: 230px;
  position: relative;
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
        <br />© 2023 John Doe All Rights Reserved
      </TextOverlay>
    </Container>
  );
};

export default Footer;
