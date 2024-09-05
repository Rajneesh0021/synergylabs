import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the type for user data
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Define the props for the UserForm component
interface UserFormProps {
  user?: User; // 'user' is optional (could be undefined for a new form)
  onSubmit: (formData: User) => void; // A function to handle form submission
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  // Use the user prop or initialize with an empty form
  const [formData, setFormData] = useState<User>(user || { id: 0, name: '', email: '', phone: '' });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
