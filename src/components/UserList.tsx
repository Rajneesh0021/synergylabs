import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import { Link } from 'react-router-dom';
import CreateUserPopup from './CreateUserPopup';
import { User } from './types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    setLoading(true);
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser: User) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      .then(response => {
        setUsers(users.map(user => user.id === updatedUser.id ? response.data : user));
        setEditingUser(null);
      })
      .catch(err => setError(err.message));
  };

  const handleCreate = (newUser: Omit<User, 'id'>) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        setUsers([...users, { ...newUser, id: response.data.id }]);
      })
      .catch(err => setError(err.message));
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>Error fetching users: {error}</div>;
  }

  return (
    <div>
      <button className="create-btn" onClick={openPopup}>Create New User</button>
      {editingUser ? (
        <UserForm user={editingUser} onSubmit={handleUpdate} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className='btngroup'>
                  <button className="btnedit" onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="btndelete">Delete</button>
                  <Link className="btnlink" to={`/users/${user.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateUserPopup isOpen={isPopupOpen} onClose={closePopup} onCreate={handleCreate} />
    </div>
  );
};

export default UserList;
