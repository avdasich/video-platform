import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('token/', { email, password });
      localStorage.setItem('access_token', data.access);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.detail || 'Неверные данные');
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-darkBg text-center mb-6">Вход</h2>
        {error && <div className="mb-4 text-errorRed text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accentBlue text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Войти
          </button>
        </form>
        <p className="text-center text-darkBg mt-4">
          Нет аккаунта?{' '}
          <a href="/register" className="text-accentBlue hover:underline">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;