const fs   = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'employees.json');

async function read() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    // Ensure every id is a string
    return parsed.map(emp => ({ ...emp, id: String(emp.id) }));
  } catch (err) {
    console.error('[fileHandler] Read error:', err.message);
    return [];
  }
}

async function write(data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[fileHandler] Write error:', err.message);
    return false;
  }
}

module.exports = { read, write };