import { MAIN_COLORS } from "../globlaStyle/colors";
import styled from "styled-components";

const Title = styled.h1`
  color: ${MAIN_COLORS.greyDark};
  font-size: 32px;
  letter-spacing: 1px;
  width: 100%;
`;
type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Title>{title}</Title>;
};
export default Header;
