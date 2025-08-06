
import React, { useState } from 'react';
import { getYouTubeId } from '../services/youtubeService';

interface AddProjectFormProps {
  onAddProject: (project: { title: string; description: string; youtubeVideoId: string; isPublic: boolean; }) => void;
  onCancel: () => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !youtubeUrl) {
      setError('Please fill out all fields.');
      return;
    }

    const youtubeVideoId = getYouTubeId(youtubeUrl);
    if (!youtubeVideoId) {
      setError('Invalid YouTube URL. Please use a valid link.');
      return;
    }

    onAddProject({ title, description, youtubeVideoId, isPublic });
    // Reset form fields
    setTitle('');
    setDescription('');
    setYoutubeUrl('');
    setIsPublic(true);
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl shadow-black/20 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold text-white mb-4">Add a New Project</h3>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="youtubeUrl" className="block text-gray-300 text-sm font-bold mb-2">YouTube Video URL</label>
          <input
            type="text"
            id="youtubeUrl"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.currentTarget.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g., https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Project Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="My Awesome Project"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="A brief description of the project."
          ></textarea>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.currentTarget.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
          />
          <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-300">Make this project public</label>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Add Project
          </button>
        </div>
      </form>
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

export default AddProjectForm;
