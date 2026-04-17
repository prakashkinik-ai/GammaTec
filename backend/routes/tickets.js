const express = require('express');
const { getDb } = require('../db/init');

const router = express.Router();

function withStudent(ticket) {
  if (!ticket) return null;
  const db = getDb();
  const student = db.prepare('SELECT id, name, program, enrollment_status FROM students WHERE id = ?').get(ticket.student_id);
  return { ...ticket, student: student || null };
}

// These specific routes must come before /:ticketId to avoid conflicts
router.get('/status/:status', (req, res) => {
  const db = getDb();
  const status = req.params.status.replace(/\+/g, ' ');
  const rows = db.prepare('SELECT * FROM tickets WHERE status = ? ORDER BY created_date DESC').all(status);
  res.json(rows.map(withStudent));
});

router.get('/type/:type', (req, res) => {
  const db = getDb();
  const type = req.params.type.replace(/\+/g, ' ');
  const rows = db.prepare('SELECT * FROM tickets WHERE type = ? ORDER BY created_date DESC').all(type);
  res.json(rows.map(withStudent));
});

router.get('/priority/:priority', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM tickets WHERE priority = ? ORDER BY created_date DESC').all(req.params.priority);
  res.json(rows.map(withStudent));
});

router.get('/', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM tickets ORDER BY created_date DESC').all();
  res.json(rows.map(withStudent));
});

router.get('/:ticketId', (req, res) => {
  const db = getDb();
  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.ticketId);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
  res.json(withStudent(ticket));
});

router.patch('/:ticketId/status', (req, res) => {
  const db = getDb();
  const { status } = req.body;
  const valid = ['Open', 'In Progress', 'Resolved'];

  if (!status || !valid.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${valid.join(', ')}` });
  }

  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.ticketId);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

  db.prepare("UPDATE tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, req.params.ticketId);
  res.json({ success: true, ticketId: req.params.ticketId, status });
});

module.exports = router;
