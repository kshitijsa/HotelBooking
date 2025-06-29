import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import axios from 'axios';

const Login = ({ onSuccess }) => {
  const { login } = useAppContext();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Clear error before trying
    try {
      const res = await axios.post('/api/auth/login', inputs);
      if (res.data && res.data.token && res.data.user) {
        login(res.data.user, res.data.token);
        if (onSuccess) onSuccess();
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      // Log the error for debugging
      console.log('Login error:', err); // Log the full error object
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} required className="border p-2 rounded" />
      <input type="password" placeholder="Password" value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} required className="border p-2 rounded" />
      <button type="submit" className="bg-black text-white py-2 rounded">Login</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default Login;
