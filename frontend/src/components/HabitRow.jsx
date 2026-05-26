import { useEffect, useState } from "react";

import MeasurableCell from "./MeasurableCell";

function HabitRow({ habit, entry, selectedDate, fetchEntries, onDelete }) {
  const toggleBoolean = async () => {
    const currentValue = entry?.value === "true";

    if (entry) {
      await fetch(`http://localhost:5000/entries/${entry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: (!currentValue).toString(),
        }),
      });
    } else {
      await fetch("http://localhost:5000/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId: habit.id,
          value: "true",
          date: selectedDate,
        }),
      });
    }

    await fetchEntries(selectedDate);
  };

  const updateMeasurable = async (value) => {
    if (entry) {
      await fetch(`http://localhost:5000/entries/${entry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
    } else {
      await fetch("http://localhost:5000/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId: habit.id,
          value,
          date: selectedDate,
        }),
      });
    }

    await fetchEntries(selectedDate);
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
      {/* HABIT NAME */}
      <div style={{ width: "150px" }}>{habit.name}</div>

      <div>
        <button onClick={() => onDelete(habit.id)}> 
          🗑️
        </button>
      </div>

      {/* BOOLEAN HABITS */}
      {habit.type === "boolean" && (
        <div
          onClick={toggleBoolean}
          style={{
            cursor: "pointer",
            userSelect: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            background: entry?.value === "true" ? "#d4f7d4" : "#f2f2f2",
          }}
        >
          {entry?.value === "true" ? "✓ Done" : "○ Not done"}
        </div>
      )}

      {/* MEASURABLE HABITS */}
      {habit.type === "measurable" && (
        <MeasurableCell entry={entry} onSave={updateMeasurable} />
      )}

    </div>
  );
}

export default HabitRow;
