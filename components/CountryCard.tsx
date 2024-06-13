"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface Props {
  imageUrl: String;
  countryName: String;
  population?: String;
  region?: String;
  capital?: String[];
  cca3?: String;
}

export const CountryCard = (props: Props) => {
  return (
    <Link href={`/country/${props.cca3}`}>
      <StyledContainer>
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

const StyledContainer = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 6%),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    .image {
      transform: scale(1.1);
    }
  }
  .image-wrapper {
    width: 100%;
    height: 150px;
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
    padding: 15px;
    h1 {
      font-size: 16px;
      font-weight: 600;
      padding-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-weight: 300;
      span {
        font-weight: 600;
      }
    }
  }
`;
