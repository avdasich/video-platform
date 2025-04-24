import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-darkBg p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          YA BRO
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/upload" className="text-white hover:text-lightGray">
                Загрузить видео
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  navigate('/login');
                }}
                className="text-white hover:text-lightGray"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-lightGray">
                Вход
              </Link>
              <Link to="/register" className="text-white hover:text-lightGray">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;