"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledContainer>
      <Image
        src={
          theme === "dark" ? "/images/light-icon.svg" : "/images/dark-icon.svg"
        }
        width={50}
        height={50}
        alt="theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        style={{ cursor: "pointer", width: 20, height: 20 }}
      />
      <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
    </StyledContainer>
  );
};

export default ThemeSwitcher;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    font-size: 14px;
    font-weight: 500;
  }
`;
