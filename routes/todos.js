const express = require('express');
const router = express.Router();

let todos = [
  { id: 1, message: 'Buy groceries', completed: false },
  { id: 2, message: 'Study for test', completed: true },
  { id: 3, message: 'Happy Birthday reminder', completed: false }
];

// ✅ Get all todos
router.get('/todos', (req, res) => {
  res.json({ message: 'Todos retrieved', data: todos });
});

// ✅ Create new todo
router.post('/todos', (req, res) => {
  const { message, completed = false } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  const newTodo = { id: todos.length + 1, message, completed };
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo created', data: newTodo });
});

// ✅ Update entire todo (PUT)
router.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  const { message, completed } = req.body;
  if (message === undefined || completed === undefined)
    return res.status(400).json({ message: 'Message and completed are required' });

  todos[index] = { id, message, completed };
  res.json({ message: 'Todo updated', data: todos[index] });
});

// ✅ Partial update (PATCH)
router.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  const { message, completed } = req.body;
  if (message !== undefined) todos[index].message = message;
  if (completed !== undefined) todos[index].completed = completed;

  res.json({ message: 'Todo partially updated', data: todos[index] });
});

// ✅ Delete todo by ID
router.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  const deleted = todos.splice(index, 1);
  res.json({ message: 'Todo deleted successfully', data: deleted[0] });
});

// ✅ Sort by ID (asc/desc)
router.get('/todos/sortById', (req, res) => {
  const { k } = req.query;
  if (!['asc', 'desc'].includes(k))
    return res.status(400).json({ message: 'Invalid sort order. Use k=asc or k=desc.' });

  const sorted = [...todos].sort((a, b) => k === 'asc' ? a.id - b.id : b.id - a.id);
  res.json({ message: `Todos sorted by ID (${k})`, data: sorted });
});

// ✅ Sort by message (A-Z or Z-A)
router.get('/todos/sortByMessage', (req, res) => {
  const { k } = req.query;
  if (!['asc', 'desc'].includes(k))
    return res.status(400).json({ message: 'Invalid sort order. Use k=asc or k=desc.' });

  const sorted = [...todos].sort((a, b) =>
    k === 'asc'
      ? a.message.localeCompare(b.message)
      : b.message.localeCompare(a.message)
  );

  res.json({ message: `Todos sorted by message (${k})`, data: sorted });
});

// ✅ Search by keyword (case-insensitive)
router.get('/todos/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Search keyword is required (q)' });

  const keyword = q.toLowerCase();
  const results = todos.filter(todo =>
    todo.message.toLowerCase().includes(keyword)
  );

  res.json({
    message: `Search results for keyword: ${q}`,
    data: results
  });
});

module.exports = router;

// http://localhost:3000/todos/sortById?k=asc
// http://localhost:3000/todos/sortById?k=desc
// http://localhost:3000/todos/sortByMessage?k=desc
// http://localhost:3000/todos/sortByMessage?k=asc

// git clone https://github.com/your-username/your-repo-name.git
// cd your-repo-name
// git status
// git add .  
// git commit -m "Initial commit"   
// git push origin main
