import { useEffect, useState } from "react";

function App() {
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/entries/today")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error(err));
  }, []);

  const entryMap = {};
  entries.forEach((e) => {
    entryMap[e.habit_id] = e;
  });

  return (
    <div>
      <div>
        <h1>Habit tracker</h1>
      </div>

      <button
        onClick={async () => {
          await fetch("http://localhost:5000/entries", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              habitId: 3,
              value: "true",
            }),
          });

          const res = await fetch("http://localhost:5000/entries/today");
          const data = await res.json();
          setEntries(data);
        }}
      >
        Log Meditation (test)
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <h4>Habit</h4>
        <h4>Entry</h4>
      </div>

      {habits.map((habit) => {
        const entry = entryMap[habit.id];

        return (
          <div
            key={habit.id}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <div>{habit.name}</div>
            <div>
              {entry ? entry.value : "-"}

              {habit.type === "boolean" && (
                <button
                  onClick={async () => {
                    await fetch("http://localhost:5000/entries", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        habitId: habit.id,
                        value: "true", // for now hardcoded
                      }),
                    });

                    const res = await fetch(
                      "http://localhost:5000/entries/today",
                    );
                    const data = await res.json();
                    setEntries(data);
                  }}
                >
                  Log
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
