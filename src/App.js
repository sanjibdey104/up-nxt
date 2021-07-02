import React, { useState, useEffect } from "react";
import db from "./firebase";

function App() {
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
  );
}

export default App;
