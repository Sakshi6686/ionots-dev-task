import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecommendedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [acceptedProjects, setAcceptedProjects] = useState([]); // Track accepted projects
  const navigate = useNavigate();

  // Fetch assigned projects once on page load

  const recommendProject=async()=>{
     
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      
      return;
    }

    try {
      const response = await axios.get('/api/manage-projects/assign-projects', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if(response.data.success){
        console.log(response.data.project," projects");
        
      }
       
    } catch (err) {
      setToastMessage('Server error occurred');
    } finally {
      
    }
  }

  const fetchAssignedProjects = async () => {
    setLoading(true);
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('/api/manage-projects/get-all-projects', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.success) {
        setProjects(response.data.projects); // Update state with project data
      } else {
        setToastMessage('Failed to fetch projects');
      }
    } catch (err) {
      setToastMessage('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAcceptedProjects = async () => {
    setLoading(true);
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('/api/manage-projects/get-all-accepted-projects', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.success) {
        setAcceptedProjects(response.data.acceptedProjects); // Update state with project data
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
    fetchAssignedProjects();
    fetchAcceptedProjects();
    recommendProject();
  }, []);

  // Handle Accept button click
  const handleAccept = async(projectId) => {
    setLoading(true);
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/api/manage-projects/change-status-accepted/${projectId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.data.success) {
        console.log("hi in acc");
        
        setAcceptedProjects([...acceptedProjects, projectId]);
      } else {
        setToastMessage('Failed to accept projects');
      }
    } catch (err) {
      setToastMessage('Server error occurred');
    } finally {
      setLoading(false);
    }
     // Add project to accepted list
  };

  // Handle View button click
  const handleView = (project) => {
    // Navigate to project detail page with project data
    console.log("Navigating to project:", project.projectId);

    navigate(`/project/${project.projectId}`);
  };

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Recommended Projects</h2>

      {/* Toast Message */}
      {toastMessage && (
        <div
          className="toast-message bg-green-500 text-white p-4 rounded-md fixed top-4 right-4 shadow-md"
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

                {/* Project Skills */}
                <div className="mt-2">
                  <span className="text-sm font-semibold">Skills:</span>{' '}
                  <span className="text-sm text-gray-500">
                    {project.ProjectSkills && project.ProjectSkills.length > 0
                      ? project.ProjectSkills.join(', ')
                      : 'No skills specified'}
                  </span>
                </div>

                {/* Project Status */}
                <div className="mt-2">
                  <span className="text-sm font-semibold">Status:</span>{' '}
                  <span className="text-sm text-gray-700">
                    {acceptedProjects.includes(project.projectId) && project.status!=="Completed" ? 'Accepted' : project.status}
                  </span>
                </div>

                {/* Accept/View Button */}
                <button
                  className="mt-4 bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition w-full"
                  onClick={() =>
                    acceptedProjects.includes(project.projectId) || project.status==="Completed"
                      ? handleView(project)
                      : handleAccept(project.projectId)
                  }
                >
                  {/* {project.status==="Accepted" ? 'View Project' : 'Accept Project'} */}
                  {project.status==="Accepted" ? 'View Project' : project.status==="Completed"?"Completed":"Accept Project"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No projects assigned yet. Check back later!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedProjects;
