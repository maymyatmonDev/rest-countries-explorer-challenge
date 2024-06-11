"use client";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import styled from "styled-components";

interface Props {}

export const Navbar = (props: Props) => {
  return (
    <StyledNav>
      <h1>Where is in the world?</h1>
      <ThemeSwitcher />
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 5%;
  padding-block: 28px;
  background-color: #fff;
  box-shadow: 5px 5px 5px hsl(209deg 23% 22% / 5%);
  h1 {
    font-size: 18px;
  }
`;
