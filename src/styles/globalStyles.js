import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
    --accent-color: #efa135da;
}

html {
    box-sizing: border-box;
    font-size: 100%;
}

*,*::before,*::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}

body {
    width: 100%;
    height: 100vh;
    line-height: 1.4;
    background-color: #fff;
    color: #000;
    font-family: 'Montserrat', sans-serif;
}

#root {
    width: 100%;
    height: 100%;
}

.container {
    width: 100%;
    min-height: 100%;
    background-color: #efefef;
    padding-bottom: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

#loading-indicator {
    width: 100%;
    height: 100%;
    text-align: center;
}

input,textarea,button, select {
    font-family: inherit;
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
