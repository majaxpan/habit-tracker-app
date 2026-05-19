import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Habit Tracker</h1>

      {habits.length === 0 ? (
        <p>Loading habits...</p>
      ) :(
        <ul>
          {habits.map(habit => (
            <li key={habit.id}>
              {habit.name} ({habit.type})
            </li>
          ))}
      </ul>
      )}
    </div>
  );
}

export default App;