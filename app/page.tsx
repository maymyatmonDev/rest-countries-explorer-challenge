"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { CountryCard } from "@/components/CountryCard";
import Grid from "@mui/material/Grid";
import data from "../data.json";
// import { GET_COUNTRIES } from "@/api/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  if (!mounted) {
    return null;
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  return (
    <StyledMain>
      {/* <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
      /> */}
      <Grid container spacing={4} style={{ paddingBlock: 40 }}>
        {data.slice(0, 10).map((item, key) => (
          <Grid item xs={3} key={key}>
            <CountryCard
              imageUrl={item.flags.png}
              countryName={item.name}
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
