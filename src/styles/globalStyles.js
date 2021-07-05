import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

html {
    box-sizing: border-box;
    font-size: 100%;
}

*,*::before,*::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-family: 'Solway', serif;
    font-family: 'Space Mono', monospace;
}

body {
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    line-height: 1.4;
}

.container {
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;

    display: flex;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
    color: inherit;
}

img, svg {
    display: block;
}

button {
    border: 0;
    cursor: pointer;
    background-color: inherit;
}
`;

export const lightTheme = {
  backgroundColor: "#fff",
  textColor: "#000",
  accentColor: "#4262ff",
  boxShadow: "inset 0 0 7.5px rgba(0,0,0,0.2)",
  mobileNavLink: "#ffffffda",
};

export const darkTheme = {
  backgroundColor: "#121212",
  textColor: "#ffffffda",
  accentColor: "#bb86fc",
  boxShadow: "0 0 8px #000",
  mobileNavLink: "#000",
};
