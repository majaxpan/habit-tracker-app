import { useEffect, useState } from "react";

function MeasurableCell({ entry, unit, onSave }) {
  const [value, setValue] = useState(entry?.value || "");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(entry?.value || "");
  }, [entry]);

  const hasValue = entry?.value != null && entry?.value !== "";

  const validate = () => {
    if (value === "" || value === null || value === undefined) {
      return "Value cannot be empty";
    }

    const num = Number(value);

    if (Number.isNaN(num)) {
      return "Value must be a number";
    }

    if (num <= 0) {
      return "Value must be greater than 0";
    }

    return "";
  };

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
          backgroundColor: hasValue ? "var(--green-soft)" : "var(--bg-soft)",
          color: hasValue ? "var(--green-text)" : "var(--text-soft)",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
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
            const err = validate();

            if (err) {
              setError(err);
              return;
            }

            onSave(value);
            setIsEditing(false);
            setError("");
          }}
          style={{
            height: "34px",
            borderRadius: "8px",
          }}
        >
          Save
        </button>

        <button
          onClick={() => {
            setIsEditing(false);
            setError("");
            setValue(entry?.value || "");
          }}
          style={{
            height: "34px",
            borderRadius: "8px",
            background: "var(--bg-soft)",
          }}
        >
          Cancel
        </button>
      </div>

      {error && (
        <div
          style={{
            fontSize: "12px",
            color: "#b00020",
            background: "#ffe8e8",
            padding: "6px 8px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default MeasurableCell;
