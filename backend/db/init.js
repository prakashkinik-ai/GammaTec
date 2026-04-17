const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'gammatc.sqlite');
let db;

function getDb() {
  return db;
}

function initDb() {
  db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      program TEXT,
      enrollment_status TEXT,
      semester TEXT,
      advisor TEXT,
      gpa TEXT,
      financial_aid TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      type TEXT,
      status TEXT DEFAULT 'Open',
      priority TEXT,
      subject TEXT,
      notes TEXT,
      created_date TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS phone_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT,
      old_phone TEXT,
      new_phone TEXT,
      changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
  if (count === 0) {
    seed(db);
    console.log('Database seeded with 20 students and 13 tickets.');
  }
}

function seed(db) {
  const insertStudent = db.prepare(`
    INSERT INTO students (id, name, phone, email, program, enrollment_status, semester, advisor, gpa, financial_aid)
    VALUES (@id, @name, @phone, @email, @program, @enrollment_status, @semester, @advisor, @gpa, @financial_aid)
  `);

  const insertTicket = db.prepare(`
    INSERT INTO tickets (id, student_id, type, status, priority, subject, notes, created_date)
    VALUES (@id, @student_id, @type, @status, @priority, @subject, @notes, @created_date)
  `);

  const students = [
    { id: 'GTC100023', name: 'Marcus Rivera',     phone: '(508) 334-7812', email: 'mrivera2847@students.gammatc.edu',      program: 'Cybersecurity (AAS)',                  enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Dr. Angela Chu',     gpa: '3.4', financial_aid: 'Pell Grant + MassGrant Plus' },
    { id: 'GTC100047', name: 'Priya Nair',         phone: '(774) 209-5543', email: 'pnair3491@students.gammatc.edu',         program: 'Nursing — ADN',                        enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Prof. Linda Torres',  gpa: '3.8', financial_aid: 'MassGrant Plus + Work-Study' },
    { id: 'GTC100062', name: 'Darnell Washington', phone: '(508) 771-3394', email: 'dwashington5102@students.gammatc.edu',   program: 'Business Administration (AAS)',         enrollment_status: 'Part-Time',  semester: 'Spring 2026', advisor: 'Mr. Carlos Reyes',   gpa: '3.1', financial_aid: 'Pell Grant' },
    { id: 'GTC100089', name: 'Sofia Mendes',        phone: '(774) 882-6610', email: 'smendes6234@students.gammatc.edu',       program: 'Early Childhood Education (Diploma)',  enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Ms. Joyce Kim',      gpa: '3.6', financial_aid: 'MassGrant + Scholarship' },
    { id: 'GTC100104', name: "James O'Brien",       phone: '(508) 446-0023', email: 'jobrien7345@students.gammatc.edu',       program: 'Welding Technology (Diploma)',          enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Mr. Dave Schmidt',   gpa: '3.2', financial_aid: 'Pell Grant' },
    { id: 'GTC100118', name: 'Amara Diallo',        phone: '(774) 553-8871', email: 'adiallo8456@students.gammatc.edu',       program: 'Medical Assisting (Certificate)',       enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Prof. Linda Torres',  gpa: '3.5', financial_aid: 'MassGrant Plus' },
    { id: 'GTC100135', name: 'Ethan Pham',          phone: '(508) 992-1147', email: 'epham9012@students.gammatc.edu',         program: 'Network Administration (AAS)',          enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Dr. Angela Chu',     gpa: '3.3', financial_aid: 'Pell Grant + MassGrant Plus' },
    { id: 'GTC100149', name: 'Fatima Hassan',       phone: '(774) 338-4490', email: 'fhassan1023@students.gammatc.edu',       program: 'Criminal Justice Technology (AAS)',     enrollment_status: 'Part-Time',  semester: 'Spring 2026', advisor: 'Mr. James Burke',    gpa: '3.0', financial_aid: 'Pell Grant' },
    { id: 'GTC100167', name: 'Carlos Gutierrez',    phone: '(508) 227-9934', email: 'cgutierrez2134@students.gammatc.edu',    program: 'HVAC/R Technology (Diploma)',           enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Mr. Dave Schmidt',   gpa: '2.9', financial_aid: 'Pell Grant' },
    { id: 'GTC100182', name: 'Leah Kowalski',       phone: '(774) 661-2283', email: 'lkowalski3245@students.gammatc.edu',     program: 'Accounting Technology (AAS)',           enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Mr. Carlos Reyes',   gpa: '3.7', financial_aid: 'MassGrant Plus + Scholarship' },
    { id: 'GTC100196', name: 'Kwame Asante',        phone: '(508) 114-6677', email: 'kasante4356@students.gammatc.edu',       program: 'Data Analytics (Certificate)',          enrollment_status: 'Part-Time',  semester: 'Spring 2026', advisor: 'Dr. Angela Chu',     gpa: '3.4', financial_aid: 'Pell Grant' },
    { id: 'GTC100210', name: 'Destiny Okafor',      phone: '(774) 445-9901', email: 'dokafor5467@students.gammatc.edu',       program: 'Surgical Technology (AAS)',             enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Prof. Linda Torres',  gpa: '3.6', financial_aid: 'MassGrant Plus' },
    { id: 'GTC100224', name: 'Tyler Marsh',         phone: '(508) 880-3312', email: 'tmarsh6578@students.gammatc.edu',        program: 'Automotive Service Technology (Diploma)', enrollment_status: 'Full-Time', semester: 'Spring 2026', advisor: 'Mr. Dave Schmidt',   gpa: '3.1', financial_aid: 'Pell Grant' },
    { id: 'GTC100238', name: 'Mei-Ling Chen',       phone: '(774) 774-5566', email: 'mchen7689@students.gammatc.edu',         program: 'Health Information Technology (AAS)',   enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Prof. Linda Torres',  gpa: '3.5', financial_aid: 'MassGrant Plus + Work-Study' },
    { id: 'GTC100253', name: 'Andre Johnson',       phone: '(508) 553-8840', email: 'ajohnson8790@students.gammatc.edu',      program: 'Emergency Medical Services (Certificate)', enrollment_status: 'Part-Time', semester: 'Spring 2026', advisor: 'Mr. James Burke',   gpa: '3.2', financial_aid: 'Pell Grant' },
    { id: 'GTC100267', name: 'Isabella Torres',     phone: '(774) 992-1103', email: 'itorres9012@students.gammatc.edu',       program: 'Web Development (Certificate)',          enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Dr. Angela Chu',     gpa: '3.8', financial_aid: 'MassGrant Plus' },
    { id: 'GTC100281', name: 'Samuel Osei',         phone: '(508) 334-1199', email: 'sosei1023@students.gammatc.edu',         program: 'Electrical Technology (AAS)',            enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Mr. Dave Schmidt',   gpa: '3.3', financial_aid: 'Pell Grant + MassGrant Plus' },
    { id: 'GTC100295', name: 'Nadia Volkov',        phone: '(774) 228-6654', email: 'nvolkov2134@students.gammatc.edu',       program: 'Business Administration (AAS)',         enrollment_status: 'Part-Time',  semester: 'Spring 2026', advisor: 'Mr. Carlos Reyes',   gpa: '3.6', financial_aid: 'Pell Grant' },
    { id: 'GTC100309', name: 'Jordan Williams',     phone: '(508) 660-4422', email: 'jwilliams3245@students.gammatc.edu',     program: 'Computer Information Systems (AAS)',    enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Dr. Angela Chu',     gpa: '3.0', financial_aid: 'MassGrant Plus' },
    { id: 'GTC100323', name: 'Aisha Bamba',         phone: '(774) 117-3380', email: 'abamba4356@students.gammatc.edu',        program: 'Dental Hygiene (AAS)',                  enrollment_status: 'Full-Time',  semester: 'Spring 2026', advisor: 'Prof. Linda Torres',  gpa: '3.9', financial_aid: 'MassGrant Plus + Scholarship' },
  ];

  const tickets = [
    { id: 'TKT-8821', student_id: 'GTC100023', type: 'IT Support',    status: 'Open',        priority: 'High',   subject: 'Cannot access Canvas — login loop after password reset',           notes: 'Student reports being redirected back to login page after entering correct credentials. Password was reset via IT portal 2026-04-09. Issue persists on Chrome and Firefox. Single Sign-On token may be stale.', created_date: '2026-04-10' },
    { id: 'TKT-8834', student_id: 'GTC100047', type: 'Financial Aid', status: 'In Progress', priority: 'Medium', subject: 'MassGrant Plus not disbursed for Spring 2026',                      notes: 'Student was awarded MassGrant Plus but funds have not posted to account. FAFSA is complete. Enrollment verified. Escalated to Financial Aid director on 2026-04-12.', created_date: '2026-04-11' },
    { id: 'TKT-8799', student_id: 'GTC100089', type: 'Admissions',    status: 'Resolved',    priority: 'Low',    subject: 'CORI background check delay resolved',                              notes: 'Student experienced a 3-week delay in CORI results. Resolved 2026-04-08. Student cleared for clinical placement.', created_date: '2026-03-18' },
    { id: 'TKT-8847', student_id: 'GTC100118', type: 'Advising',      status: 'Open',        priority: 'Medium', subject: 'Certificate to AAS pathway review requested',                       notes: 'Student in Medical Assisting Certificate wants to know steps to upgrade to AAS. Advisor meeting scheduled for 2026-04-22.', created_date: '2026-04-14' },
    { id: 'TKT-8803', student_id: 'GTC100135', type: 'IT Support',    status: 'Resolved',    priority: 'Low',    subject: 'Wi-Fi credential issue on personal laptop',                          notes: 'Student could not connect to GammaNet-Secure. Issue was incorrect certificate installation. Resolved by IT on 2026-04-05.', created_date: '2026-04-03' },
    { id: 'TKT-8858', student_id: 'GTC100167', type: 'Financial Aid', status: 'Open',        priority: 'High',   subject: 'Tuition hold blocking Summer 2026 registration',                   notes: 'Balance of $847 from Spring 2026 not resolved. Student claims payment was submitted but not posted. Bursar investigating. Student cannot register until hold cleared.', created_date: '2026-04-15' },
    { id: 'TKT-8812', student_id: 'GTC100196', type: 'Advising',      status: 'In Progress', priority: 'Low',    subject: 'Transfer credit evaluation to UMass Lowell — Data Analytics',       notes: 'Student is completing Data Analytics Certificate and wants to transfer to UMass Lowell Computer Science program. MassTransfer evaluation in progress. Expected completion 2026-04-25.', created_date: '2026-04-08' },
    { id: 'TKT-8864', student_id: 'GTC100210', type: 'General Inquiry', status: 'Open',      priority: 'Low',    subject: "Griffin's Pantry hours and eligibility inquiry",                    notes: "Student unsure if part-time students qualify for Griffin's Pantry. Confirmed all enrolled students qualify. Need to send official response with hours and location.", created_date: '2026-04-15' },
    { id: 'TKT-8840', student_id: 'GTC100238', type: 'IT Support',    status: 'In Progress', priority: 'Medium', subject: 'Microsoft 365 license not activating on student account',            notes: 'Student purchased M365 through college program but license key invalid on second device. IT confirmed license was already activated on another machine. Ticket escalated to Microsoft support.', created_date: '2026-04-12' },
    { id: 'TKT-8852', student_id: 'GTC100267', type: 'Admissions',    status: 'In Progress', priority: 'Medium', subject: 'Dual enrollment transcript hold from prior institution',             notes: 'Transcript from Worcester Public Schools has not been received despite student submitting release form. Registrar contacting WPS directly. Student temporarily enrolled pending resolution.', created_date: '2026-04-13' },
    { id: 'TKT-8829', student_id: 'GTC100295', type: 'General Inquiry', status: 'Resolved',  priority: 'Low',    subject: 'Phi Theta Kappa eligibility question',                              notes: 'Student asked if 3.5 GPA requirement is based on cumulative or semester GPA. Confirmed it is cumulative. Student at 3.6 — eligible. Invitation sent 2026-04-10.', created_date: '2026-04-09' },
    { id: 'TKT-8870', student_id: 'GTC100309', type: 'IT Support',    status: 'Open',        priority: 'High',   subject: 'Navigate student portal showing "Account Inactive"',                notes: 'Student cannot access Navigate portal for advising appointments. Account shows Inactive despite active enrollment in Banner. IT suspects sync issue between Banner and Navigate. Escalated to Navigate admin.', created_date: '2026-04-16' },
    { id: 'TKT-8876', student_id: 'GTC100196', type: 'General Inquiry', status: 'Resolved',  priority: 'Low',    subject: 'MassTransfer agreement list — UMass Lowell confirmation',           notes: 'Student requested written confirmation of MassTransfer agreement. Official letter sent 2026-04-14.', created_date: '2026-04-13' },
  ];

  const seedAll = db.transaction(() => {
    for (const s of students) insertStudent.run(s);
    for (const t of tickets) insertTicket.run(t);
  });

  seedAll();
}

module.exports = { initDb, getDb };
