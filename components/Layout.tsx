import React, { ReactNode } from "react";
import styled from "styled-components";
import Head from "next/head";

import Navbar from "./Navbar";

import { COLORS } from "../utils/styledVariables";
import HighLight from "./HighLight";

type Props = {
  children?: ReactNode;
  title?: string;
};

const StyledLayout = styled.div`
  background-color: ${COLORS.WHITE};
`;

const Layout = ({ children, title }: Props) => (
  <StyledLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    <HighLight />
    {children}
    <footer></footer>
  </StyledLayout>
);

export default Layout;
