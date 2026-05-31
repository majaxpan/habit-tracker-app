import MeasurableCell from "./MeasurableCell";
import { apiFetch } from "../api";

function HabitRow({ habit, entry, selectedDate, fetchEntries, onDelete }) {
  const isDone = entry?.value === "true";

  const toggleBoolean = async () => {
    const newValue = isDone ? "false" : "true";

    await apiFetch("/entries", {
      method: "POST",
      body: JSON.stringify({
        habitId: habit.id,
        value: newValue,
        date: selectedDate,
      }),
    });

    await fetchEntries(selectedDate);
  };

  const updateMeasurable = async (value) => {
    if (entry) {
      await apiFetch(`/entries/${entry.id}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
      });
    } else {
      await apiFetch("/entries", {
        method: "POST",
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
        <div style={{ fontWeight: 600, flex: 1, wordBreak: "break-word" }}>
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
              backgroundColor: isDone ? "var(--green-soft)" : "#f2f2f2",
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
