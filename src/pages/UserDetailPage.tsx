import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the 'id' from the route params
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>Error fetching user: {error}</div>;
  }

  return (
    <div className='userDetail'>
      {user ? (
        <>
          <h2 className='name'>{user.name}</h2>
          <p className='email'>Email: {user.email}</p>
          <p className='phone'>Phone: {user.phone}</p>
        </>
      ) : (
        <div className='notFound'>User not found</div>
      )}
    </div>
  );
};

export default UserDetailPage;
