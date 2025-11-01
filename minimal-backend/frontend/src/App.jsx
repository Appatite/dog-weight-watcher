import React, { useState, useEffect } from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      alert('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  // Create or update user
  const saveUser = async (userData) => {
    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users'
      const method = editingUser ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      await fetchUsers()
      setEditingUser(null)
      alert(editingUser ? 'User updated successfully!' : 'User created successfully!')
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      await fetchUsers()
      alert('User deleted successfully!')
    } catch (error) {
      alert('Error deleting user')
    }
  }

  // Set user for editing
  const editUser = (user) => {
    setEditingUser(user)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null)
  }

  // Load users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <p>React Frontend + Node.js/MySQL Backend</p>
      </header>

      <div className="app-container">
        <div className="form-section">
          <UserForm 
            user={editingUser}
            onSave={saveUser}
            onCancel={cancelEdit}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <UserList 
              users={users}
              onEdit={editUser}
              onDelete={deleteUser}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App