import { useEffect, useState } from "react";
import "./App.css";

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
    <div className="app">
      <div>
        <h1>Habit tracker</h1>
      </div>

      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "12px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <h3>Create Habit</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>
            Type
          </div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="boolean">non-measurable</option>
            <option value="measurable">measurable</option>
          </select>

          <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>
            Name
          </div>
          <input
            style={{ padding: "6px" }}
            placeholder="e.g. Reading"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {type === "measurable" && (
            <>
              <div
                style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}
              >
                Unit
              </div>

              <input
                style={{ padding: "6px" }}
                placeholder="e.g. Pages"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </>
          )}

          <button
            style={{ padding: "8px" }}
            onClick={async () => {
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

              //clear the form
              setName("");
              setUnit("");
              setType("boolean");
            }}
          >
            Create
          </button>
        </div>
      </div>

      <div>Viewing: {selectedDate}</div>

      <div
        style={{
          border: "1px solid #eee",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "12px",
            fontSize: "12px",
            opacity: 0.7,
            borderBottom: "1px solid #eee",
          }}
        >
          <h3>Habit</h3>
          <h3>Entry</h3>
        </div>

        {/* ROWS */}
        {habits.map((habit) => {
          const entry = entryMap[habit.id];

          return (
            <div
              key={habit.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "12px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>{habit.name}</div>

              <div>
                {habit.type === "boolean" && (
                  <div>
                    {entry?.value === "true" ? (
                      <div>Done ✓</div>
                    ) : (
                      <button
                        onClick={async () => {
                          await fetch("http://localhost:5000/entries", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              habitId: habit.id,
                              value: "true",
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
                )}

                {habit.type === "measurable" && (
                  <div>
                    {entry ? (
                      <div>{`${entry.value} ${habit.unit}`}</div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                          flexWrap: "nowrap",
                        }}
                      >
                        <input
                          type="number"
                          value={inputValues[habit.id] || ""}
                          onChange={(e) => {
                            setInputValues({
                              ...inputValues,
                              [habit.id]: e.target.value,
                            });
                          }}
                          style={{
                            width: "90px",
                            padding: "6px",
                            fontSize: "14px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                          }}
                        />

                        <button
                          onClick={async () => {
                            await fetch("http://localhost:5000/entries", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                habitId: habit.id,
                                value: inputValues[habit.id],
                              }),
                            });

                            const res = await fetch(
                              "http://localhost:5000/entries/today",
                            );
                            const data = await res.json();
                            setEntries(data);
                          }}
                          style={{
                            padding: "4px 8px",
                            fontSize: "12px",
                          }}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
