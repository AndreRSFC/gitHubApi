import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { COLORS } from "../utils/styledVariables";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: ${COLORS.WHITE};
  height: 48px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);

  nav {
    margin-left: 20px;
  }

  img {
    width: 32px;
    height: 32px;

    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <StyledHeader>
      <nav>
        <Link href="/">
          <img
            alt="Icone com que indica a home da pagina"
            src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png"
          />
        </Link>
      </nav>
    </StyledHeader>
  );
};

export default Navbar;
