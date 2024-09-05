import React, { useState } from 'react';
import { login } from 'frontend/src/services/authService';
import { useAppDispatch } from 'frontend/src/store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const response = await login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;