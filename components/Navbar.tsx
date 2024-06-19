"use client";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import styled from "styled-components";
import { useTheme } from "next-themes";

interface Props {}

export const Navbar = (props: Props) => {
  const { theme } = useTheme();
  return (
    <StyledNav theme={theme}>
      <h1>Where is in the world?</h1>
      <ThemeSwitcher />
    </StyledNav>
  );
};

const StyledNav = styled.nav<{ theme?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 5%;
  padding-block: 28px;
  box-shadow: 5px 5px 5px hsl(209deg 23% 22% / 5%);
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--color-bg-light-gray)"
      : "var(--color-bg-dark-blue)"};
  transition: all 0.3s ease-in;
  h1 {
    font-size: 18px;
    @media (max-width: 425px) {
      font-size: 14px;
    }
  }
  @media (max-width: 425px) {
    padding-block: 20px;
  }
`;
