const express = require("express");
const cors = require("cors");

const habitRoutes = require("./routes/habitRoutes");
const entryRoutes = require("./routes/entryRoutes");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

//REQUEST MAPPING("/habits")
app.use("/habits", habitRoutes);

app.use("/entries", entryRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB connection error", err);
  } else {
    console.log("DB connected:", res.rows);
  }
});
