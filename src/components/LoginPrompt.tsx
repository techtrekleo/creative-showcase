import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';

const LoginPrompt: React.FC = () => {

  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-8 my-10 text-center border border-cyan-500 shadow-lg shadow-cyan-500/10">
      <h2 className="text-3xl font-bold text-white mb-4">Unlock All Projects</h2>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        You're currently viewing a public selection of my work. To see my full portfolio, including exclusive content and in-depth tutorials, please sign in with your Google account.
      </p>
      <div className="flex justify-center">
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default LoginPrompt;
