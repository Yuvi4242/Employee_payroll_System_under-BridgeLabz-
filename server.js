const express = require('express');
const path    = require('path');
const { read, write } = require('./modules/fileHandler');

const app  = express();
const PORT = 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ── GET / — Dashboard ─────────────────────────────────────────────────────────
app.get('/', async (req, res) => {
  try {
    const employees = await read();
    res.render('index', { employees });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.render('index', { employees: [] });
  }
});

// ── GET /add ──────────────────────────────────────────────────────────────────
app.get('/add', (req, res) => {
  res.render('add', { error: null });
});

// ── POST /add ─────────────────────────────────────────────────────────────────
app.post('/add', async (req, res) => {
  const { name, department, salary, gender, startDate } = req.body;

  if (!name || name.trim() === '')
    return res.render('add', { error: 'Employee name cannot be empty.' });
  if (!department || department.trim() === '')
    return res.render('add', { error: 'Department cannot be empty.' });
  if (!gender)
    return res.render('add', { error: 'Please select a gender.' });
  if (!startDate)
    return res.render('add', { error: 'Please select a start date.' });

  const salaryNum = Number(salary);
  if (isNaN(salaryNum) || salaryNum < 0)
    return res.render('add', { error: 'Salary must be a valid non-negative number.' });

  const employees = await read();
  employees.push({
    id:         String(Date.now()),
    name:       name.trim(),
    department: department.trim(),
    gender,
    startDate,
    salary:     salaryNum
  });

  await write(employees);
  res.redirect('/');
});

// ── GET /edit/:id ─────────────────────────────────────────────────────────────
app.get('/edit/:id', async (req, res) => {
  const employees = await read();
  const employee  = employees.find(e => e.id === req.params.id);
  if (!employee) return res.redirect('/');
  res.render('edit', { employee, error: null });
});

// ── POST /edit/:id ────────────────────────────────────────────────────────────
app.post('/edit/:id', async (req, res) => {
  const { name, department, salary, gender, startDate } = req.body;
  const employees = await read();
  const index     = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.redirect('/');

  if (!name || name.trim() === '')
    return res.render('edit', { employee: employees[index], error: 'Employee name cannot be empty.' });
  if (!department || department.trim() === '')
    return res.render('edit', { employee: employees[index], error: 'Department cannot be empty.' });
  if (!gender)
    return res.render('edit', { employee: employees[index], error: 'Please select a gender.' });
  if (!startDate)
    return res.render('edit', { employee: employees[index], error: 'Please select a start date.' });

  const salaryNum = Number(salary);
  if (isNaN(salaryNum) || salaryNum < 0)
    return res.render('edit', { employee: employees[index], error: 'Salary must be a valid non-negative number.' });

  employees[index] = {
    id: req.params.id,
    name: name.trim(),
    department: department.trim(),
    gender,
    startDate,
    salary: salaryNum
  };

  await write(employees);
  res.redirect('/');
});

// ── GET /delete/:id ───────────────────────────────────────────────────────────
app.get('/delete/:id', async (req, res) => {
  const employees = await read();
  await write(employees.filter(e => e.id !== req.params.id));
  res.redirect('/');
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n🚀 PayrollPro running → http://localhost:${PORT}\n`);
  const employees = await read();
  employees.forEach(e => console.log(`  • ${e.name} | ${e.gender} | ${e.startDate} | ₹${e.salary}`));
});