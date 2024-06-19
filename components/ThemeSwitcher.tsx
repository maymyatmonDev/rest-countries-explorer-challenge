"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  let currentTheme: any = "";
  if (typeof window !== "undefined") {
    currentTheme = localStorage.getItem("theme");
  }

  useEffect(() => {
    setMounted(true);
    setTheme(currentTheme ? currentTheme : "light");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledContainer
      theme={theme}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image
        src={
          theme === "dark" ? "/images/light-icon.svg" : "/images/dark-icon.svg"
        }
        width={20}
        height={20}
        alt="theme"
        style={{ cursor: "pointer" }}
      />
      <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
    </StyledContainer>
  );
};

export default ThemeSwitcher;

const StyledContainer = styled.div<{ theme?: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  img {
    @media (max-width: 425px) {
      width: 15px;
      height: 15px;
    }
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) =>
      props.theme === "light"
        ? "var(--color-dark-blue)"
        : "var(--color-light)"};
    @media (max-width: 425px) {
      font-size: 11px;
    }
  }
`;
