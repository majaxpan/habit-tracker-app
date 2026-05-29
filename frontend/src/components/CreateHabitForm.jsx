import { useEffect, useState } from "react";

function CreateHabitForm({
  name,
  setName,
  type,
  setType,
  unit,
  setUnit,
  onCreate,
}) {
  return (
    <div className="card">
      <h3>Create Habit</h3>

      <div className="field">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="boolean">non-measurable</option>
          <option value="measurable">measurable</option>
        </select>
      </div>

      <div className="field">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {type === "measurable" && (
        <div className="field">
          <label>Unit</label>
          <input value={unit} onChange={(e) => setUnit(e.target.value)} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <button
          onClick={onCreate}
          style={{
            background: "#111",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateHabitForm;
