import { useState, useEffect } from 'react';

const ProjectAssignment = () => {
   
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    const fetchProjects = () => {
      setLoading(true);
 
      setTimeout(() => {
        setProjects([
          {
            id: 1,
            title: 'Project A',
            description: 'Data analysis on sales data',
            status: 'In Progress',
            score: 75
          },
          {
            
            id: 2,
            title: 'Project B',
            description: 'AI model for recommendation system',
            status: 'Not Started',
            score: 0
          },
          {
            id: 3,
            title: 'Project C',
            description: 'Image classification using CNNs',
            status: 'Completed',
            score: 100
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchProjects();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Assigned Projects</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading projects...</div>
      ) : (
        <div className="project-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-sky-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>

              <div className="progress mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`text-sm font-semibold ${project.status === 'Completed' ? 'text-green-600' : project.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">Score:</span>
                  <span className="text-sm font-semibold text-gray-800">{project.score}</span>
                </div>
              </div>

              <button className="mt-4 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition duration-300 w-full">
                {project.status === 'Not Started' ? 'Accept Project' : 'View Project'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectAssignment;
