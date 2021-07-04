import React, { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { TaskListContext } from "./context/TaskListContext";
import { FetchAllTasks } from "./data/AllTasks";
import { ThemeProvider } from "styled-components";
import { ThemePreference } from "./styles/themeConfig";
import { GlobalStyles, lightTheme, darkTheme } from "./styles/globalStyles";

import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";
import Logo from "./components/Logo";

function App() {
  const [theme, toggleTheme] = ThemePreference();
  const themePreference = theme === "light" ? lightTheme : darkTheme;

  let [tasks, loading] = FetchAllTasks();

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      <ThemeProvider theme={themePreference}>
        <GlobalStyles />

        <TaskListContext.Provider value={{ tasks: tasks, loading: loading }}>
          <div className="container">
            <Logo />
            <Sidebar />
            <MainSection />
          </div>
        </TaskListContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
