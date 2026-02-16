Day1-16_2_26
# Employee Payroll System – File Handling Setup

## 📌 Project Overview

This project is a basic **Node.js + Express** setup that reads employee data from a JSON file using a separate module (`fileHandler.js`).
The goal is to safely handle file reading and writing using **fs.promises** with proper error handling.

---

## ⚙️ Initialization & Installation

Run the following commands inside your project folder:

```bash
npm init -y
npm install express ejs
```

---

## 📁 Project Structure

```
Employee_Payroll_System/
│
├── server.js
├── employees.json
└── modules/
    └── fileHandler.js
```

---

## 🧩 fileHandler.js (Model Layer)

* Uses `fs.promises` for async file handling.
* Contains:

  * `read()` → Reads employee data from JSON file.
  * `write(data)` → Writes updated data into JSON file.
* Uses `try/catch` to prevent server crashes.

Key Path Logic:

```js
const filePath = path.join(__dirname, "../employees.json");
```

`../` moves one folder back from `modules` to the main project folder.

---

## 📄 employees.json

Create a JSON file manually and add sample data:

```json
[
  {
    "id": 1,
    "name": "Yuvraj",
    "department": "CSE"
  }
]
```

---

## 🚀 Server Functionality

When the server starts:

* It calls `fileHandler.read()`
* Reads employee data from `employees.json`
* Logs employee data in the terminal

Run server:

```bash
node server.js
```

Expected Output:

```
Employee Data: [ { id: 1, name: 'Yuvraj', department: 'CSE' } ]
Server running on http://localhost:3000
```

---

## 🧠 Important Notes

* `path` module must be written in lowercase:

```js
const path = require("path");
```

* Correct require path from server:

```js
const fileHandler = require("./modules/fileHandler");
```

* Always restart server after changes:

```bash
CTRL + C
node server.js
```

---

## ✅ Goal Achieved

✔ Express server initialized
✔ Modular file handling created
✔ JSON data read successfully
✔ Employee data logged on server start

---
