import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/habits")
      .then(res => res.json())
      .then(data => setHabits(data));
  }, []);

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits.map(h => (
          <li key={h.id}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;