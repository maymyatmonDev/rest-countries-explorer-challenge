"use client";
import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import data from "../../../data.json";

interface Props {
  imageUrl: String;
  countryName: String;
  population?: String;
  region?: String;
  capital?: String;
}

const sampleData = data.filter((item) => item?.name === "Germany")[0];

const CountryDetail = (props: Props) => {
  return (
    <StyleContainer>
      <Link href={"/"} className="back-btn">
        Back
      </Link>
      <Grid
        container
        style={{ alignItems: "center", justifyContent: "space-between" }}
        spacing={6}
      >
        <Grid item xs={5} style={{ paddingRight: 10 }}>
          <Image
            width={100}
            height={100}
            src={sampleData.flags.png}
            alt="country-image"
          />
        </Grid>
        <Grid item xs={7} className="content">
          <h1>{sampleData.name}</h1>
          <div
            style={{
              display: "flex",
              gap: "12%",
              // justifyContent: "space-between",
            }}
          >
            <div>
              <p>
                <span>Native Name: </span> {sampleData.nativeName}
              </p>
              <p>
                <span>Population: </span>
                {sampleData.population}
              </p>
              <p>
                <span>Region: </span> {sampleData.region}
              </p>
              <p>
                <span>Sub Region: </span> {sampleData.subregion}
              </p>
              <p>
                <span>Capital: </span> {sampleData.capital}
              </p>
            </div>
            <div>
              <p>
                <span>Top level domain: </span> {sampleData.topLevelDomain}
              </p>
              <p>
                <span>Currencies: </span>{" "}
                {sampleData.currencies?.map((currency) => currency.code)}
              </p>
              <p>
                <span>Languages: </span>{" "}
                {sampleData.languages?.map((lang) => lang.name)}
              </p>
            </div>
          </div>
          <div className="border-countries">
            <p>Border Countries: </p>
            <div style={{ display: "flex", gap: "5px" }}>
              <p className="border-item">France</p>
              <p className="border-item">Germany</p>
              <p className="border-item">Netherlands</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </StyleContainer>
  );
};

export default CountryDetail;

const StyleContainer = styled.div`
  margin-inline: 5%;
  padding-block: 50px;
  .back-btn {
    padding-inline: 25px;
    padding-block: 10px;
    border-radius: 5px;
    box-shadow: -2px 0rem 10px -2px rgb(0 0 0 / 14%),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    margin-bottom: 40px;
    width: max-content;
    display: block;
  }
  img {
    width: 100%;
    height: auto;
  }
  .content {
    h1 {
      font-size: 24px;
      margin-bottom: 15px;
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
      // justify-content: space-between;
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
  }
`;
