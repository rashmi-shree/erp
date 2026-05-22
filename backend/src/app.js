const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// const promBundle = require("express-prom-bundle");

const employeeRoutes = require("./routes/employee.routes");

const app = express();

// Initialize Prometheus metrics middleware
// const metricsMiddleware = promBundle({
//   includeMethod: true,
//   includePath: true,
//   includeStatusCode: true,
//   promClient: {
//     collectDefaultMetrics: {}
//   }
// });

// app.use(metricsMiddleware);

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