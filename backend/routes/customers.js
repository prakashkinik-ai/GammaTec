const express = require('express');
const { getDb } = require('../db/init');

const router = express.Router();

function formatStudent(row, ticket) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    program: row.program,
    enrollmentStatus: row.enrollment_status,
    semester: row.semester,
    advisor: row.advisor,
    gpa: row.gpa,
    financialAid: row.financial_aid,
    ticket: ticket
      ? {
          id: ticket.id,
          type: ticket.type,
          status: ticket.status,
          priority: ticket.priority,
          created: ticket.created_date,
          subject: ticket.subject,
          notes: ticket.notes,
        }
      : null,
  };
}

router.get('/', (req, res) => {
  const db = getDb();
  const { name, phone, program, status, page = 1, limit = 20 } = req.query;

  let query = 'SELECT * FROM students WHERE 1=1';
  const params = [];

  if (name) {
    query += ' AND LOWER(name) LIKE ?';
    params.push(`%${name.toLowerCase()}%`);
  }
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    query += " AND REPLACE(REPLACE(REPLACE(REPLACE(phone, '(', ''), ')', ''), '-', ''), ' ', '') LIKE ?";
    params.push(`%${digits}%`);
  }
  if (program) {
    query += ' AND LOWER(program) LIKE ?';
    params.push(`%${program.toLowerCase()}%`);
  }
  if (status) {
    query += ' AND LOWER(enrollment_status) = ?';
    params.push(status.toLowerCase());
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  const rows = db.prepare(query).all(...params);
  const result = rows.map((row) => {
    const ticket = db.prepare("SELECT * FROM tickets WHERE student_id = ? AND status != 'Resolved' ORDER BY CASE priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END LIMIT 1").get(row.id);
    return formatStudent(row, ticket);
  });

  res.json(result);
});

router.get('/:id/phone-history', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM phone_history WHERE student_id = ? ORDER BY changed_at DESC').all(req.params.id);
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Student not found' });

  const ticket = db.prepare("SELECT * FROM tickets WHERE student_id = ? ORDER BY CASE status WHEN 'Open' THEN 1 WHEN 'In Progress' THEN 2 ELSE 3 END, CASE priority WHEN 'High' THEN 1 WHEN 'Medium' THEN 2 ELSE 3 END LIMIT 1").get(row.id);
  res.json(formatStudent(row, ticket));
});

router.patch('/:id/phone', (req, res) => {
  const db = getDb();
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ error: 'phone is required' });

  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const oldPhone = student.phone;

  db.prepare("UPDATE students SET phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(phone, req.params.id);
  db.prepare('INSERT INTO phone_history (student_id, old_phone, new_phone) VALUES (?, ?, ?)').run(req.params.id, oldPhone, phone);

  res.json({ success: true, previousPhone: oldPhone, newPhone: phone });
});

module.exports = router;
