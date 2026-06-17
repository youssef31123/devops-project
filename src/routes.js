const express = require('express');
const router = express.Router();

let tasks = [];
let idCounter = 1;

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const task = { id: idCounter++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.done = !task.done;
  res.json(task);
});

router.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
