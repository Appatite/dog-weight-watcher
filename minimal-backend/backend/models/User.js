import pool from '../config/database.js';

export default class User {
  // Get all users
  static async getAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  // Get user by ID
  static async getById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  // Create new user
  static async create(userData) {
    try {
      const { name, email, age } = userData;
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
        [name, email, age]
      );
      return this.getById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  // Update user
  static async update(id, userData) {
    try {
      const { name, email, age } = userData;
      const [result] = await pool.execute(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
        [name, email, age, id]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      return this.getById(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}