import { useEffect, useState } from "react";
import "./App.css";

import CreateHabitForm from "./components/CreateHabitForm";
import HabitRow from "./components/HabitRow";

function App() {
  //habits + todays entries
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);

  //add habit form
  const [name, setName] = useState("");
  const [type, setType] = useState("boolean");
  const [unit, setUnit] = useState("");

  const [isAddingHabit, setIsAddingHabit] = useState(false);

  //date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    fetch("http://localhost:5000/habits")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHabits(data);
      })
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

  const handleDeleteHabit = async (habitId) => {
    const res = await fetch(`http://localhost:5000/habits/${habitId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const resetHabitForm = () => {
    setName("");
    setType("boolean");
    setUnit("");
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header style={{ marginBottom: "16px" }}>
        <h1 style={{ margin: 0 }}>Habit tracker</h1>
      </header>

      {/* CONTROL BAR */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            flex: 1,
            height: "36px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            padding: "0 10px",
          }}
        />

        <button
          onClick={() => setIsAddingHabit(true)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            border: "none",
            background: "#111",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            transition: "0.15s ease",
          }}
        >
          +
        </button>
      </section>

      {isAddingHabit && (
        <div
          className="modal-overlay"
          onClick={() => {
            setIsAddingHabit(false);
            resetHabitForm();
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <CreateHabitForm
              name={name}
              setName={setName}
              type={type}
              setType={setType}
              unit={unit}
              setUnit={setUnit}
              onCreate={() => {
                handleCreateHabit();
                setIsAddingHabit(false);
                resetHabitForm();
              }}
            />

            <button
              onClick={() => {
                setIsAddingHabit(false);
                resetHabitForm();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
            onDelete={handleDeleteHabit}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
