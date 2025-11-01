import React from 'react'
import UserItem from './UserItem'
import './UserList.css'

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return (
      <div className="user-list">
        <h2>Users</h2>
        <div className="empty-state">
          <p>No users found. Add your first user!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      <div className="users-grid">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default UserList