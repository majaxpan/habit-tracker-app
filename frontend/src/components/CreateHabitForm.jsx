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

      <button onClick={onCreate}>Create</button>
    </div>
  );
}

export default CreateHabitForm;
