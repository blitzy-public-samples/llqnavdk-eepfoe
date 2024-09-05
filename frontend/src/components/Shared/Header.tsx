import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'frontend/src/store';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.user.currentUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MCA Application System
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/applications" className="hover:text-blue-200">Applications</Link>
          <Link to="/documents" className="hover:text-blue-200">Documents</Link>
          {user?.role === 'Admin' && (
            <Link to="/users" className="hover:text-blue-200">Users</Link>
          )}
        </nav>
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span>{user.username}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block hover:text-blue-200" onClick={toggleMenu}>Home</Link>
          <Link to="/applications" className="block hover:text-blue-200" onClick={toggleMenu}>Applications</Link>
          <Link to="/documents" className="block hover:text-blue-200" onClick={toggleMenu}>Documents</Link>
          {user?.role === 'Admin' && (
            <Link to="/users" className="block hover:text-blue-200" onClick={toggleMenu}>Users</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;