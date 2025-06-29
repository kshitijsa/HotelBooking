import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSuccess }) => {
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', inputs);
      setSuccess('Signup successful! Please login.');
      setError('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Name" value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} required className="border p-2 rounded" />
      <input type="email" placeholder="Email" value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} required className="border p-2 rounded" />
      <input type="password" placeholder="Password" value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} required className="border p-2 rounded" />
      <button type="submit" className="bg-black text-white py-2 rounded">Signup</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
};

export default Signup;
