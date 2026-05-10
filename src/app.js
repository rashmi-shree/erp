const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const employeeRoutes = require("./routes/employee.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date()
  });
});

app.use("/employees", employeeRoutes);

module.exports = app;