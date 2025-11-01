import React from 'react'
import './UserItem.css'

const UserItem = ({ user, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
        {user.age && <p className="user-age">Age: {user.age}</p>}
        <p className="user-created">
          Created: {formatDate(user.created_at)}
        </p>
      </div>
      
      <div className="user-actions">
        <button 
          className="btn-edit"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserItem