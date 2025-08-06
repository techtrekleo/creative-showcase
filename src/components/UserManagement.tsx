
import React, { useState, useEffect } from 'react';
import { AppUser } from '../types';

const USER_STORAGE_KEY = 'creative_showcase_users';

const UserManagement: React.FC = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    try {
      const storedUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
      const storedUsers: AppUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      setUserCount(storedUsers.length);
    } catch (error) {
      console.error("Could not read users from localStorage", error);
    }
  }, []);

  const handleExportCsv = () => {
    try {
      const storedUsersRaw = localStorage.getItem(USER_STORAGE_KEY);
      const storedUsers: AppUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      if (storedUsers.length === 0) {
        window.alert("No user data to export.");
        return;
      }

      // Prepare CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Name,Email\r\n"; // Header row

      storedUsers.forEach(user => {
        csvContent += `${user.name || ''},${user.email || ''}\r\n`;
      });

      // Create and trigger download
      const encodedUri = encodeURI(csvContent);
      const link = window.document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "creative_showcase_users.csv");
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);

    } catch (error) {
      console.error("Failed to export CSV", error);
      window.alert("An error occurred while exporting the user list.");
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl shadow-black/20 animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-2">User Management</h3>
      <p className="text-gray-400 mb-4 text-sm">
        This panel provides tools to manage users who have logged into this application.
      </p>
      
      <div className="bg-gray-900 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="font-bold text-white">Remembered Users</p>
                <p className="text-gray-400 text-xs">Total unique users logged in on this browser.</p>
            </div>
            <p className="text-3xl font-bold text-cyan-400">{userCount}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleExportCsv}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Export User List (CSV)
        </button>
        <p className="text-xs text-gray-500 mt-3">
            Clicking this will download a CSV file containing the names and emails of all remembered users. You can use this file to contact your members via email services like Gmail or Mailchimp.
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
