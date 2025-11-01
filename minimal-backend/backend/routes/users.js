import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const updatedUser = await User.update(req.params.id, { name, email, age });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;