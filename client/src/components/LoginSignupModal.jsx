import React, { useState } from 'react';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';

const LoginSignupModal = ({ onClose }) => {
  const [tab, setTab] = useState('login');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${tab === 'login' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-l`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 ${tab === 'signup' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-r`}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>
        {tab === 'login' ? <Login onSuccess={onClose} /> : <Signup onSuccess={() => setTab('login')} />}
      </div>
    </div>
  );
};

export default LoginSignupModal;
