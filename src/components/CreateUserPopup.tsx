import React, { useState, ChangeEvent, FormEvent } from 'react';
import { User } from './types'; // Import the User type

interface CreateUserPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: Omit<User, 'id'>) => void; // Use Omit<User, 'id'> for new user creation
}

const CreateUserPopup: React.FC<CreateUserPopupProps> = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ name: '', email: '', phone: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPopup;
