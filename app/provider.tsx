"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

const Providers = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
