import React, { useContext, useState, useCallback, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { AuthContext } from './context/AuthContext';
import { db } from './firebase';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import LoginPrompt from './components/LoginPrompt';
import AddProjectForm from './components/AddProjectForm';
import { Project } from './types';
import UserManagement from './components/UserManagement';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const projectsCollection = collection(db, 'projects');
        const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(projectsQuery);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Project));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);


  if (!authContext) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const { user, isAdmin, loading: authLoading } = authContext;

  const handleAddProject = useCallback(async (newProjectData: { title: string; description: string; youtubeVideoId: string; isPublic: boolean; }) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...newProjectData,
        createdAt: Date.now(),
      });
      const newProject: Project = {
        ...newProjectData,
        id: docRef.id,
        createdAt: Date.now(),
      };
      setProjects(prevProjects => [newProject, ...prevProjects]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }, []);

  const handleDeleteProject = useCallback(async (idToDelete: string) => {
    try {
      await deleteDoc(doc(db, 'projects', idToDelete));
      setProjects(prevProjects => prevProjects.filter(project => project.id !== idToDelete));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }, []);

  const visibleProjects = user ? projects : projects.filter(p => p.isPublic);

  const toggleUserManagement = () => {
    setShowAddForm(false);
    setShowUserManagement(!showUserManagement);
  };
  
  const toggleAddProjectForm = () => {
    setShowUserManagement(false);
    setShowAddForm(!showAddForm);
  }

  const renderContent = () => {
    if (authLoading || isLoadingProjects) {
        return <div className="text-center text-white text-xl">Loading Projects...</div>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project) => (
                <ProjectCard
                key={project.id}
                project={project}
                onDelete={isAdmin ? handleDeleteProject : undefined}
                />
            ))}
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            My Work
          </h2>
          <p className="mt-4 max-w-md mx-auto text-lg text-gray-400 sm:text-xl md:mt-5 md:max-w-3xl">
            A curated collection of my favorite projects. 
            {isAdmin ? "As an admin, you can manage projects and users." : user ? "You have full access to view all projects." : "Log in to see everything."}
          </p>
        </div>

        {isAdmin && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={toggleAddProjectForm}
                  className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${showAddForm ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                >
                  {showAddForm ? 'Close Form' : '+ Add New Project'}
                </button>
                 <button
                  onClick={toggleUserManagement}
                  className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${showUserManagement ? 'bg-cyan-500 text-white shadow-cyan-500/20' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                >
                  {showUserManagement ? 'Close User Panel' : 'User Management'}
                </button>
            </div>
            
            {showAddForm && <AddProjectForm onAddProject={handleAddProject} onCancel={() => setShowAddForm(false)} />}
            {showUserManagement && <UserManagement />}
          </div>
        )}

        {renderContent()}

        {!user && <LoginPrompt />}
      </main>
      <footer className="text-center py-6 text-gray-500 border-t border-gray-800 mt-12">
        <p>&copy; {new Date().getFullYear()} Creative Showcase. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
