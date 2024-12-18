import { useState, useEffect } from 'react';
import axios from 'axios';

const AssingedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch the projects
  const fetchProjects = async () => {
    setLoading(true);
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('https://ionots-dev-task-backend.onrender.com/api/manage-projects/get-all-projects', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.success) {
        // Filter projects that are either Accepted or Completed
        const filteredProjects = response.data.projects.filter(
          (project) => project.status === 'Accepted' || project.status === 'Completed'
        );
        setProjects(filteredProjects);
      } else {
        setToastMessage('Failed to fetch projects');
      }
    } catch (err) {
      setToastMessage('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Progress Tracking</h2>

      {/* Toast Message */}
      {toastMessage && (
        <div
          className="toast-message bg-red-500 text-white p-4 rounded-md fixed top-4 right-4 shadow-md"
          onClick={() => setToastMessage('')}
        >
          {toastMessage}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.projectId}
                className="bg-white shadow-md rounded-lg p-4 hover:bg-sky-100 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.projectTitle}
                </h3>

                {/* Project Status */}
                <div className="mt-2">
                  <span className="text-sm font-semibold">Status:</span>{' '}
                  <span className="text-sm text-gray-700">{project.status}</span>
                </div>

                {/* Project Skills */}
                <div className="mt-2">
                  <span className="text-sm font-semibold">Skills:</span>{' '}
                  <span className="text-sm text-gray-500">
                    {project.ProjectSkills && project.ProjectSkills.length > 0
                      ? project.ProjectSkills.join(', ')
                      : 'No skills specified'}
                  </span>
                </div>

                {/* View Project Button */}
                <button
                  className="mt-4 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition w-full"
                  onClick={() => window.location.href = `/project/${project.projectId}`} // Navigate to project details
                >
                 {project.status==="Accepted"?'View Project':'Completed'}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No Accepted or Completed projects found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssingedProjects 
