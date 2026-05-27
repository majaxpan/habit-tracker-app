import { useEffect, useState } from "react";

function MeasurableCell({ entry, unit, onSave }) {
  const [value, setValue] = useState(entry?.value || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(entry?.value || "");
  }, [entry]);

  const hasValue = entry?.value != null && entry?.value !== "";

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          height: "34px",
          padding: "0 10px",
          borderRadius: "8px",
          backgroundColor: hasValue ? "#d4f7d4" : "#f2f2f2",
          color: hasValue ? "#1b5e20" : "#777",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        {hasValue ? (
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

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "70px",
          height: "34px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          padding: "0 8px",
        }}
      />

      <button
        onClick={() => {
          onSave(value);
          setIsEditing(false);
        }}
        style={{
          height: "34px",
          borderRadius: "8px",
        }}
      >
        Save
      </button>

      <button
        onClick={() => setIsEditing(false)}
        style={{
          height: "34px",
          borderRadius: "8px",
          background: "#f2f2f2",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default MeasurableCell;
