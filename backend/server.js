const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/init');

const customersRouter = require('./routes/customers');
const ticketsRouter = require('./routes/tickets');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initDb();

app.get('/health', (req, res) => {
  const db = require('./db/init').getDb();
  const records = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
  const tickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    records,
    tickets,
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'Gamma Technical College ARIA API',
    version: '1.0.0',
    endpoints: [
      'GET  /health',
      'GET  /customers',
      'GET  /customers?name=',
      'GET  /customers?phone=',
      'GET  /customers?program=',
      'GET  /customers?status=',
      'GET  /customers/:id',
      'PATCH /customers/:id/phone',
      'GET  /customers/:id/phone-history',
      'GET  /tickets',
      'GET  /tickets/:ticketId',
      'GET  /tickets/status/:status',
      'GET  /tickets/type/:type',
      'GET  /tickets/priority/:priority',
      'PATCH /tickets/:ticketId/status',
      'GET  /stats',
    ],
  });
});

app.post('/contact', (req, res) => {
  res.json({ success: true });
});

app.use('/customers', customersRouter);
app.use('/tickets', ticketsRouter);
app.use('/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`Gamma TC API running on port ${PORT}`);
});
