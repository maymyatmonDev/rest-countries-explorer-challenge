/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { CountryCard } from "@/components/CountryCard";
import Grid from "@mui/material/Grid";
import { LoadingComponent } from "@/components/LoadingComponent";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface filterProps {
  region: String;
  searchValue: String;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);
  const [regions, setRegions] = useState<String[]>(["test"]);
  const [filter, setFilter] = useState<filterProps>({
    region: "all",
    searchValue: "",
  });

  console.log("theme", theme);

  const fetchRegions = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);

      // Extract unique regions
      const regionList = data.map((item: any) => item.region);
      const list: String[] = [];
      regionList.map((reg: String) => {
        if (list.includes(reg)) {
          return;
        } else {
          list.push(reg);
        }
      });
      setRegions(list);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async (value: String, type: String) => {
    let query = value
      ? type === "region"
        ? value === "all"
          ? `all`
          : `region/${value}`
        : value !== ""
        ? `name/${value}`
        : `all`
      : "all";
    try {
      let res = null;
      res = await fetch(`https://restcountries.com/v3.1/${query}`);
      const data = await res?.json();
      setCountries(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value: String, type: String) => {
    if (type === "region") {
      setFilter({ ...filter, region: value });
      fetchCountries(value, type);
    } else {
      setLoading(true);
      setFilter({ ...filter, searchValue: value });
      setTimeout(() => {
        fetchCountries(value, type);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchRegions();
    setTheme("light");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledMain>
      <Grid container justifyContent="space-between" className="filter-section">
        <Grid item xs={12} lg={4} className="search-field">
          <SearchIcon />
          <TextField
            id="country-search"
            type="search"
            variant="standard"
            placeholder="Search for a country"
            value={filter.searchValue}
            onChange={(e: any) => handleFilter(e.target.value, "search")}
          />
        </Grid>
        <Grid item xs={8} lg={2}>
          <FormControl fullWidth>
            {regions && regions.length > 0 && (
              <Select
                id="region-select"
                value={filter.region}
                onChange={(e: any) => {
                  handleFilter(e.target.value, "region");
                }}
              >
                <MenuItem value="all">Filter by Region</MenuItem>
                {regions?.map((region: any, key: any) => (
                  <MenuItem value={region} key={key}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
      {loading && <LoadingComponent />}
      {!loading && !error && (
        <Grid container spacing={8} style={{ paddingBlock: 40 }}>
          {countries && countries?.length > 0 ? (
            countries?.map((item: any, key) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={key}
                className="country-item"
              >
                <CountryCard
                  imageUrl={item.flags.png}
                  cca3={item.cca3}
                  countryName={item.name.common}
                  population={String(item.population)}
                  region={item.region}
                  capital={item.capital}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} className="not-found-message">
              Sorry, Country not found!
            </Grid>
          )}
        </Grid>
      )}
      {error && (
        <Grid item xs={12} className="not-found-message">
          Sorry, Country not found!
        </Grid>
      )}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  margin-inline: 5%;
  min-height: 100vh;
  padding-block: 40px;
  @media (max-width: 768px) {
    padding-block: 20px;
  }
  .filter-section {
    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
  }
  .search-field {
    display: flex;
    padding-inline: 2%;
    align-items: center;
    gap: 10px;
    background-color: var(--color-white);
    border-radius: 5px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 6%),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    svg {
      path {
        color: var(--color-dark-grey);
      }
    }
    .css-1eed5fa-MuiInputBase-root-MuiInput-root::after {
      border: none;
    }
    .MuiInputBase-root {
      margin: 0;
      &::before {
        border: none !important;
      }
    }
    input {
      font-size: 14px;
    }
    @media (max-width: 1200px) {
      padding-block: 15px;
      margin-bottom: 20px;
    }
    @media (max-width: 425px) {
      padding-block: 10px;
      margin-bottom: 10px;
    }
  }
  #region-select {
    background-color: var(--color-white);
    border-radius: 5px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 6%),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    font-size: 14px;
    @media (max-width: 425px) {
      padding-block: 10px;
    }
  }
  fieldset {
    border: none;
  }
  .country-item {
    @media (max-width: 768px) {
      padding-top: 20px !important;
    }
  }
  .not-found-message {
    min-height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
