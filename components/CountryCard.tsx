"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Props {
  imageUrl: String;
  countryName: String;
  population?: String;
  region?: String;
  capital?: String[];
  cca3?: String;
}

export const CountryCard = (props: Props) => {
  const { theme } = useTheme();

  return (
    <Link href={`/country/${props.cca3}`}>
      <StyledContainer theme={theme}>
        <div className="image-wrapper">
          <div
            className="image"
            style={{
              backgroundImage: `url(${props.imageUrl})`,
            }}
          ></div>
        </div>
        <div className="content">
          <h1>{props.countryName}</h1>
          {props.population && (
            <p>
              <span>Population: </span>
              {props.population}
            </p>
          )}
          {props.region && (
            <p>
              <span>Region: </span>
              {props.region}
            </p>
          )}
          {props.capital && (
            <p>
              <span>Capital: </span>
              {props.capital.map((cap) => cap)}
            </p>
          )}
        </div>
      </StyledContainer>
    </Link>
  );
};

const StyledContainer = styled.div<{ theme?: string }>`
  width: 100%;
  background-color: #fff;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--color-bg-light-gray)"
      : "var(--color-dark-blue)"};
  box-shadow: ${(props) =>
    props.theme === "light"
      ? "0 0.5rem 1rem rgb(0 0 0 / 6%),inset 0 -1px 0 rgba(255, 255, 255, 0.15)"
      : "0 0.5rem 1rem rgb(0 0 0 / 6%), 0 0 0 rgba(255, 255, 255, 0.15)"};
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    .image {
      transform: scale(1.1);
    }
  }
  .image-wrapper {
    width: 100%;
    height: 170px;
    overflow: hidden;
  }
  .image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.5s ease;
  }
  .content {
    padding: 25px 25px 30px 25px;
    h1 {
      font-size: 16px;
      font-weight: 700;
      padding-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 8px;
      color: ${(props) =>
        props.theme === "light"
          ? "var(--color-dark-blue)"
          : "var(--color-light)"};
      span {
        font-weight: 600;
      }
    }
  }
`;
