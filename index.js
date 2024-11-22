import express from "express";
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  try {
    res.json({ status: "Welcome to server" });
  } catch (error) {
    console.error("Error in / endpoint:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /health - Returns server status
app.get("/health", (req, res) => {
  try {
    res.json({ status: "Server is running" });
  } catch (error) {
    console.error("Error in /health endpoint:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /echo - Returns the JSON body sent in the request
app.post("/echo", (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
    }
    res.json(req.body);
  } catch (error) {
    console.error("Error in /echo endpoint:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /time - Returns the current server time in UTC
app.get("/time", (req, res) => {
  try {
    const currentTimeUTC = new Date().toISOString();
    res.json({ time: currentTimeUTC });
  } catch (error) {
    console.error("Error in /time endpoint:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res
    .status(500)
    .json({ error: "Something went wrong, please try again later." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
