"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { CountryCard } from "@/components/CountryCard";
import Grid from "@mui/material/Grid";
import data from "../data.json";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
    setTheme("light");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StyledMain>
      {/* <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
      /> */}
      <Grid container spacing={4} style={{ paddingBlock: 40 }}>
        {countries &&
          countries?.map((item: any, key) => (
            <Grid item xs={3} key={key}>
              <CountryCard
                imageUrl={item.flags.png}
                cca3={item.cca3}
                countryName={item.name.common}
                population={String(item.population)}
                region={item.region}
                capital={item.capital}
              />
            </Grid>
          ))}
      </Grid>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin-inline: 5%;
  min-height: 100vh;
  padding-block: 20px;
`;
