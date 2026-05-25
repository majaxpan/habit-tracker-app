import { useEffect, useState } from "react";

function MeasurableCell({ entry, onSave }) {
  const [value, setValue] = useState(entry?.value || "");

  useEffect(() => {
    setValue(entry?.value || "");
  }, [entry]);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "80px" }}
      />

      <button onClick={() => onSave(value)}>{entry ? "Update" : "Save"}</button>
    </div>
  );
}

export default MeasurableCell;
