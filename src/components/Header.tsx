import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Header must be used within an AuthProvider');
  }

  const { user, isAdmin, logout } = authContext;

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h1 className="text-xl font-bold text-white tracking-wider">Creative Showcase</h1>
        </div>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                  <span className="bg-cyan-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">ADMIN</span>
              )}
              <span className="text-gray-300 hidden sm:block">Welcome, {user.given_name}!</span>
              {user.picture && <img src={user.picture} alt={user.name || 'User'} className="h-10 w-10 rounded-full border-2 border-cyan-400" />}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
