const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bans.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    reason TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
