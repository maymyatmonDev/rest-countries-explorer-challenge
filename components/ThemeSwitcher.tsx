"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    <Image
      src={
        theme === "dark" ? "/images/light-icon.svg" : "/images/dark-icon.svg"
      }
      width={50}
      height={50}
      alt="theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ThemeSwitcher;
