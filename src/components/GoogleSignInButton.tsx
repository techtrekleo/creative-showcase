import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const GoogleSignInButton: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { login } = authContext;

  return (
    <button
      onClick={login}
      className="inline-flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
    >
      <svg className="w-5 h-5 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.186-.214 1.622c22.774 44.626 65.72 73.078 116.965 73.078" />
        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.173-1.622-40.298-31.186c-8.71-15.635-13.59-33.182-13.59-51.535 0-18.354 4.88-35.9 13.59-51.534l40.47-31.186c7.321-22.774 25.21-40.298 47.928-51.534l41.196 31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.186-.214 1.622c22.774 44.626 65.72 73.078 116.965 73.078" />
        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.052 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.307 0 36.36 28.451 13.59 73.078l42.691 32.813c10.59-31.477 39.891-55.412 74.269-55.412" />
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
