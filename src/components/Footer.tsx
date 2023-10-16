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
  /* Set the footer image's position to absolute to position it correctly. */
  bottom: 0;
  right: 0;
  min-height: 250px;
  object-fit: cover;
  position: absolute;
  z-index: -1; /* Move the image to the background. */
`;

const TextOverlay = styled.div`
  position: relative; /* Change to relative for correct text overlay placement. */
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
        <br />© 2023 John Doe All Rights Reserved
      </TextOverlay>
    </Container>
  );
};

export default Footer;
