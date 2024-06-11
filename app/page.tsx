"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Button from "@mui/material-nextjs/Button";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className={styles.main}>
      <ThemeSwitcher />
      <div className={styles.center}>
        <h1>Rest Countries API With Color Theme Switcher</h1>
      </div>
    </main>
  );
}
