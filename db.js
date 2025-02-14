const sqlite3 = require("sqlite3").verbose();
const express = require("express");
// Initialize Express App
const app = express();

// Connect to  Database
const db = new sqlite3.Database(
  "./data/dua_main.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log("Connected to  database.");
    }
  }
);

module.exports = db;
