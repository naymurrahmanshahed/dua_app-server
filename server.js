const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");

// Initialize Express
const app = express();
// Define Port
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/categories", categoryRoutes);
app.use("/", (req, res) => {
  res.send("Wellcome to Dua App Server");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
