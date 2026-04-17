const express = require('express');
const { getDb } = require('../db/init');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();

  const totalStudents = db.prepare('SELECT COUNT(*) as c FROM students').get().c;
  const fullTime = db.prepare("SELECT COUNT(*) as c FROM students WHERE enrollment_status = 'Full-Time'").get().c;
  const partTime = db.prepare("SELECT COUNT(*) as c FROM students WHERE enrollment_status = 'Part-Time'").get().c;
  const withTickets = db.prepare('SELECT COUNT(DISTINCT student_id) as c FROM tickets').get().c;
  const withoutTickets = totalStudents - withTickets;

  const totalTickets = db.prepare('SELECT COUNT(*) as c FROM tickets').get().c;
  const open = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE status = 'Open'").get().c;
  const inProgress = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE status = 'In Progress'").get().c;
  const resolved = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE status = 'Resolved'").get().c;

  const high = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE priority = 'High'").get().c;
  const medium = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE priority = 'Medium'").get().c;
  const low = db.prepare("SELECT COUNT(*) as c FROM tickets WHERE priority = 'Low'").get().c;

  const typeRows = db.prepare("SELECT type, COUNT(*) as c FROM tickets GROUP BY type").all();
  const types = {};
  for (const row of typeRows) types[row.type] = row.c;

  res.json({
    totalStudents,
    fullTime,
    partTime,
    withTickets,
    withoutTickets,
    tickets: { total: totalTickets, open, inProgress, resolved },
    priority: { high, medium, low },
    types,
  });
});

module.exports = router;
