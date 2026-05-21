import { useEffect, useState } from "react";

function App() {
  //habits + todays entries
  const [habits, setHabits] = useState([]);
  const [entries, setEntries] = useState([]);
  const [inputValues, setInputValues] = useState({});

  //add habit form
  const [name, setName] = useState("");
  const [type, setType] = useState("boolean");
  const [unit, setUnit] = useState("");

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

      <div style={{ marginBottom: "20px" }}>
        <h3>Add Habit</h3>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="boolean">non-measurable</option>
          <option value="measurable">measurable</option>
        </select>

        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {type === "measurable" && (
          <input
            placeholder="unit (e.g. minutes)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        )}

        <button
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
          Add
        </button>
      </div>

      {/* <button
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
      </button> */}

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
              {entry
                ? habit.type === "measurable"
                  ? `${entry.value} ${habit.unit}`
                  : entry.value
                : "-"}

              {habit.type === "boolean" && (
                <button
                  onClick={async () => {
                    //const newValue = entry?.value === "true" ? "-" : "true";

                    await fetch("http://localhost:5000/entries", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        habitId: habit.id,
                        value: "true", //newValue,
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
              {habit.type === "measurable" && (
                <div>
                  <input
                    type="number"
                    value={inputValues[habit.id] || ""}
                    onChange={(e) => {
                      setInputValues({
                        ...inputValues,
                        [habit.id]: e.target.value,
                      });
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
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
