import React from "react";
import { ThemeContext } from "./context/ThemeContext";
import { FetchAllTasks } from "./data/AllTasks";
import { ThemeProvider } from "styled-components";
import { ThemePreference } from "./styles/themeConfig";
import { GlobalStyles, lightTheme, darkTheme } from "./styles/globalStyles";
import Container from "./components/Container";

function App() {
  const [theme, toggleTheme] = ThemePreference();
  const themePreference = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <ThemeProvider theme={themePreference}>
        <GlobalStyles />
        <Container />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
