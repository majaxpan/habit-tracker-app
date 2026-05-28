import { useEffect, useState } from "react";

import MeasurableCell from "./MeasurableCell";

function HabitRow({ habit, entry, selectedDate, fetchEntries, onDelete }) {
  const isDone = entry?.value === "true";

  const toggleBoolean = async () => {
    const currentValue = isDone;

    if (entry) {
      await fetch(`http://localhost:5000/entries/${entry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: (!currentValue).toString() }),
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
    <div
      style={{
        padding: "12px 14px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            flex: 1,
            minWidth: 0,
            wordBreak: "break-word",
          }}
        >
          {habit.name}
        </div>

        <button
          onClick={() => onDelete(habit.id)}
          style={{
            background: "transparent",
            border: "none",

            opacity: 0.6,

            cursor: "pointer",

            flexShrink: 0,
          }}
        >
          🗑️
        </button>
      </div>

      {/* VALUE */}
      <div>
        {habit.type === "boolean" && (
          <div
            onClick={toggleBoolean}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "34px",
              minWidth: "44px",
              padding: "0 10px",
              borderRadius: "8px",
              backgroundColor: isDone ? "var(--soft-green)" : "#f2f2f2",
              color: isDone ? "var(--green-text)" : "var(--text-soft)",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            ✓
          </div>
        )}

        {habit.type === "measurable" && (
          <MeasurableCell
            entry={entry}
            unit={habit.unit}
            onSave={updateMeasurable}
          />
        )}
      </div>
    </div>
  );
}

export default HabitRow;
