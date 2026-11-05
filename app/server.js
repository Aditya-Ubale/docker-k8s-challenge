const express = require("express");
const os = require("os");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "development";
const GREETING = process.env.GREETING || "Hello from Task Tracker";
const VERSION = process.env.APP_VERSION || "1.0.0";

// In-memory store (each pod keeps its own copy)
const tasks = [
  { id: 1, title: "Containerize the app", done: true },
  { id: 2, title: "Deploy on Kubernetes", done: false },
];

app.get("/", (req, res) => {
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Task Tracker</title>
<style>
body{font-family:Segoe UI,Arial,sans-serif;background:#111827;color:#e5e7eb;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
.card{background:#1f2937;padding:32px 44px;border-radius:12px;min-width:460px}
h1{color:#34d399;margin:0 0 4px}.sub{color:#9ca3af;margin-bottom:18px}
td{padding:6px 16px 6px 0}td:first-child{color:#9ca3af}
</style></head><body><div class="card">
<h1>Task Tracker</h1><div class="sub">${GREETING}</div>
<table>
<tr><td>Student</td><td>Aditya Ubale</td></tr>
<tr><td>PRN</td><td>202301040111</td></tr>
<tr><td>Pod / container</td><td>${os.hostname()}</td></tr>
<tr><td>Environment</td><td>${APP_ENV}</td></tr>
<tr><td>Version</td><td>${VERSION}</td></tr>
<tr><td>Tasks stored</td><td>${tasks.length}</td></tr>
</table></div></body></html>`);
});

app.get("/health", (req, res) => res.json({ status: "healthy" }));

app.get("/api/info", (req, res) =>
  res.json({ student: "Aditya Ubale", prn: "202301040111", hostname: os.hostname(), env: APP_ENV, version: VERSION })
);

app.get("/api/tasks", (req, res) => res.json(tasks));

app.post("/api/tasks", (req, res) => {
  if (!req.body || !req.body.title) return res.status(400).json({ error: "title is required" });
  const task = { id: tasks.length + 1, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(PORT, "0.0.0.0", () => console.log(`Task Tracker listening on port ${PORT} (${APP_ENV})`));
