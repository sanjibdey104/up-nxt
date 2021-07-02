import React, { useState, useEffect } from "react";
import db from "./firebase";
import { ThemeContext } from './context/ThemeContext'
import { ThemeProvider } from 'styled-components'
import { ThemePreference } from './styles/themeConfig'
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles'

function App() {

  const [theme, toggleTheme] = ThemePreference();
  const themePreference = (theme === 'light') ?  lightTheme : darkTheme;

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    setLoading(true);
    db.collection("tasks").onSnapshot((querySnapshot) => {
      let arr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setTasks(arr);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
      <ThemeProvider theme={themePreference}>
      <GlobalStyles />

      <div className="App">
        <header>
          <h2>Up Nxt</h2>
        </header>
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task" key={task.key}>
              <h2>{task.focus}</h2>
              <p>{task.description}</p>
              <p>{task.status}</p>
            </li>
          ))}
        </ul>
      </div>

      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
