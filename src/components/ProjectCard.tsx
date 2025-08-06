
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent event from bubbling up to parent elements
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      if (typeof onDelete === 'function') {
        onDelete(project.id);
      }
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-black/30 transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 z-10 bg-red-600/80 hover:bg-red-700 text-white rounded-full p-2 transition-all duration-200 ease-in-out transform hover:scale-110"
          aria-label="Delete project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${project.youtubeVideoId}`}
          title={project.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
        <p className="text-gray-400 text-base">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
