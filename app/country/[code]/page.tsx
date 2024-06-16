"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import data from "../../../data.json";
import { LoadingComponent } from "@/components/LoadingComponent";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface Props {}

const country = data.filter((item) => item?.name === "Germany")[0];

const CountryDetail = (props: Props) => {
  const searchParams = useParams();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (searchParams.code) {
      const fetchCountries = async () => {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${searchParams.code}`
          );
          const data = await res.json();
          data && data?.length > 0 && setCountry(data[0]);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCountries();
    }
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <StyleContainer>
      <Link href={"/"} className="back-btn">
        <KeyboardBackspaceIcon fontSize="small" />
        Back
      </Link>
      <Grid
        container
        style={{ alignItems: "center", justifyContent: "space-between" }}
        spacing={6}
      >
        {country && (
          <>
            <Grid item xs={12} lg={5} style={{ paddingRight: 10 }}>
              <Image
                width={100}
                height={100}
                src={country.flags?.png}
                alt="country-image"
              />
            </Grid>
            <Grid item lg={7} className="content">
              <h1>{country.name?.common}</h1>
              <div className="desc">
                <div>
                  <p>
                    <span>Native Name: </span>{" "}
                    {country.nativeName?.map(
                      (native_name: any) => native_name.official
                    )}
                  </p>
                  <p>
                    <span>Population: </span>
                    {country.population}
                  </p>
                  <p>
                    <span>Region: </span> {country.region}
                  </p>
                  <p>
                    <span>Sub Region: </span> {country.subregion}
                  </p>
                  <p>
                    <span>Capital: </span> {country.capital?.[0]}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Top level domain: </span> {country.tld}
                  </p>
                  <p>
                    {console.log(
                      "country.currencies",
                      Object.keys(country.currencies)
                    )}
                    <span>Currencies: </span>{" "}
                    {
                      country.currencies[Object.keys(country.currencies)[0]]
                        ?.name
                    }
                  </p>
                  <p>
                    <span>Languages: </span>{" "}
                    {country.languages[Object.keys(country.languages)[0]]}
                  </p>
                </div>
              </div>
              {country.borderCountries && (
                <div className="border-countries">
                  <p>Border Countries: </p>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <p className="border-item">France</p>
                    <p className="border-item">Germany</p>
                    <p className="border-item">Netherlands</p>
                  </div>
                </div>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </StyleContainer>
  );
};

export default CountryDetail;

const StyleContainer = styled.div`
  margin-inline: 5%;
  padding-block: 50px;
  @media (max-width: 425px) {
    padding-block: 20px;
  }
  .back-btn {
    padding-inline: 25px;
    padding-block: 10px;
    border-radius: 5px;
    box-shadow: -2px 0rem 10px -2px rgb(0 0 0 / 14%),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    margin-bottom: 40px;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: var(--color-dark-grey);
  }
  img {
    width: 100%;
    height: auto;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 24%),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    border-radius: 5px;
  }
  .content {
    h1 {
      font-size: 24px;
      margin-bottom: 15px;
      @media (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 25px;
      }
    }
    p {
      margin-bottom: 10px;
      font-size: 14px;
      span {
        font-weight: 600;
      }
    }
    .border-countries {
      margin-top: 20px;
      display: flex;
      gap: 10%;
      align-items: center;
      .border-item {
        padding-inline: 15px;
        padding-block: 10px;
        border-radius: 5px;
        box-shadow: -2px 0rem 10px -2px rgb(0 0 0 / 14%),
          inset 0 -1px 0 rgba(255, 255, 255, 0.15);
      }
    }
    .desc {
      display: flex;
      gap: 12%;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      div {
        margin-bottom: 20px;
      }
    }
  }
  .MuiGrid-item {
    @media (max-width: 768px) {
      padding-top: 30px !important;
    }
  }
`;
