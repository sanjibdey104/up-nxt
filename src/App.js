import React from "react";
import { ThemeContext } from './context/ThemeContext'
import { ThemeProvider } from 'styled-components'
import { ThemePreference } from './styles/themeConfig'
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles'

import Sidebar from './components/Sidebar'
import MainSection from './components/MainSection'

function App() {

  const [theme, toggleTheme] = ThemePreference();
  const themePreference = (theme === 'light') ?  lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
      <ThemeProvider theme={themePreference}>
      <GlobalStyles />

      <div className="container">
        <Sidebar />
        <MainSection />
      </div>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
