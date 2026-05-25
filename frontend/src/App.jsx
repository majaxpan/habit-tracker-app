import { useEffect, useState } from "react";
import "./App.css";

import CreateHabitForm from "./components/CreateHabitForm";
import HabitRow from "./components/HabitRow";

function App() {
  //habits + todays entries
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);
  const [inputValues, setInputValues] = useState({});

  //add habit form
  const [name, setName] = useState("");
  const [type, setType] = useState("boolean");
  const [unit, setUnit] = useState("");

  //date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    fetch("http://localhost:5000/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error(err));
  }, []);

  const entryMap = {};
  entries.forEach((e) => {
    entryMap[e.habit_id] = e;
  });

  const fetchEntries = async (date) => {
    const res = await fetch(`http://localhost:5000/entries?date=${date}`);
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setInputValues({});
  }, [selectedDate]);

  const handleCreateHabit = async () => {
    if (!name.trim()) return;
    if (type === "measurable" && !unit.trim()) return;

    const res = await fetch("http://localhost:5000/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        type,
        unit: type === "boolean" ? null : unit,
      }),
    });

    const newHabit = await res.json();

    setHabits((prev) => [...prev, newHabit]);

    setName("");
    setUnit("");
    setType("boolean");
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header style={{ marginBottom: "20px" }}>
        <h1>Habit tracker</h1>
      </header>

      {/* TOP CONTROLS */}
      <section style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <CreateHabitForm
          name={name}
          setName={setName}
          type={type}
          setType={setType}
          unit={unit}
          setUnit={setUnit}
          onCreate={handleCreateHabit}
        />
      </section>

      {/* DATE INFO */}
      <div style={{ marginBottom: "10px", opacity: 0.7 }}>
        Viewing: {selectedDate}
      </div>

      {/* HABITS LIST */}
      <section
        style={{
          border: "1px solid #eee",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            entry={entryMap[habit.id]}
            selectedDate={selectedDate}
            fetchEntries={fetchEntries}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
