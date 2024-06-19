import React from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

interface Props {}

export const LoadingComponent = (props: Props) => {
  const { theme } = useTheme();
  return (
    <StyledContainer theme={theme}>
      <div id="loading">
        <ul className="loading">
          <li className="blue"></li>
          <li className="green"></li>
          <li className="yellow"></li>
          <li className="pink"></li>
        </ul>
        <div id="progress-message">Loading Countries ...</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="5"
              result="gaussianBlur"
            />
            <feColorMatrix
              in="gaussianBlur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="color-matrix"
            />
            <feBlend in="SourceGraphic" in2="color-matrix" />
          </filter>
        </defs>
      </svg>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ theme?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  #loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    // background-color: rgba(0, 0, 0, 0.9);
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    list-style: none;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);

    filter: url("#goo");
  }
  .loading li {
    position: absolute;
    top: 0;
    height: 10px;
    width: 10px;
    padding: 0;
    margin: 0;
    border-radius: 50%;
  }
  .loading li.pink {
    background: #f03;
    animation: loading-animated 2s ease-in-out infinite;
  }
  .loading li.yellow {
    background: #ff0;
    animation: loading-animated 2s ease-in-out 0.3s infinite;
  }
  .loading li.green {
    background: #0f0;
    animation: loading-animated 2s ease-in-out 0.5s infinite;
  }
  .loading li.blue {
    background: #0ff;
    animation: loading-animated 2s ease-in-out 0.7s infinite;
  }
  @-webkit-keyframes loading-animated {
    0% {
      -webkit-transform: translateX(-200px) scale(0);
    }
    50% {
      -webkit-transform: translateX(0px) scale(1.5);
    }
    100% {
      -webkit-transform: translateX(200px) scale(0);
    }
  }
  @keyframes loading-animated {
    0% {
      transform: translateX(-200px) scale(0);
    }
    50% {
      transform: translateX(0px) scale(1.5);
    }
    100% {
      transform: translateX(200px) scale(0);
    }
  }
  #progress-message {
    position: absolute;
    top: 54%;
    width: 100%;
    font-size: 14px;
    letter-spacing: 2.5px;
    text-align: center;
    color: ${(props) =>
      props.theme === "light"
        ? "var(--color-text-dark-blue)"
        : "var(--color-light)"};
  }
`;
