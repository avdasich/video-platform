import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('users/register/', formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        setErrors({ non_field_errors: ['Connection error'] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-darkBg text-center mb-6">Регистрация</h2>
        {errors.non_field_errors && (
          <div className="mb-4 text-errorRed text-center">{errors.non_field_errors}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Электронная почта"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
            {errors.email && <p className="text-errorRed text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-5">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Имя"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
            {errors.username && <p className="text-errorRed text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentBlue placeholder-lightGray"
              required
            />
            {errors.password && <p className="text-errorRed text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-accentBlue text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-darkBg mt-4">
          Уже есть аккаунт?{' '}
          <a href="/login" className="text-accentBlue hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;