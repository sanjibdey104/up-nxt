import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

:root {
    --box-shadow: 0 0 3px #d5d5d5, 3px 3px 0 rgba(0,0,0,0.3);
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
    background-color: #fff;
    color: #000;
    line-height: 1.4;

    font-family: 'Solway', serif;
    font-family: 'Space Mono', monospace;
}

#root {
    width: 100%;
    height: 100%;
}

.container {
    width: 85%;
    margin: 0 auto;
    min-height: 100%;
    padding: 2rem 0;

    @media (max-width: 600px) {
        width: 95%;
    }

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
