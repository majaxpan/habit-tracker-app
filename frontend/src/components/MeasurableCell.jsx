import { useEffect, useState } from "react";

function MeasurableCell({ entry, unit, onSave }) {
  const [value, setValue] = useState(entry?.value || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(entry?.value || "");
  }, [entry]);

  // VIEW MODE
  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "baseline",
          gap: "6px",
          padding: "6px 10px",
          borderRadius: "6px",
          backgroundColor: entry?.value != null ? "#d4f7d4" : "#f2f2f2",
          color: entry?.value != null ? "#1b5e20" : "#777",
        }}
      >
        {entry?.value != null ? (
          <>
            <strong>{entry.value}</strong>
            <span style={{ fontSize: "12px", opacity: 0.7 }}>{unit}</span>
          </>
        ) : (
          "+ Add"
        )}
      </div>
    );
  }

  // EDIT MODE
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "80px" }}
      />

      <button
        onClick={() => {
          onSave(value);
          setIsEditing(false);
        }}
      >
        {entry ? "Update" : "Save"}
      </button>

      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  );
}

export default MeasurableCell;