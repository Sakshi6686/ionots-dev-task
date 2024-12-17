import { useState, useEffect } from 'react';

const ProgressTracking = () => {
 
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
            progress: 65,
            tasks: [
             
             
         { title: 'Data Collection', progress: 50, status: 'In Progress' },
             { title: 'Data Cleaning', progress: 75, status: 'In Progress' },
              { title: 'Model Training', progress: 100, status: 'Completed' },
            ]
          },
          {
            id: 2,
            title: 'Project B',
            description: 'AI model for recommendation system',
            status: 'Not Started',
            progress: 0,
            tasks: [
              { title: 'Data Collection', progress: 0, status: 'Not Started' },

              { title: 'Model Design', progress: 0, status: 'Not Started' },
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchProjects();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Progress Tracking</h2>

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

              
              <div className="mt-4">
                <span className="text-sm text-gray-500">Overall Progress:</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-sky-500 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-gray-500">{project.progress}%</span>
                  <span className={`font-semibold ${project.status === 'Completed' ? 'text-green-600' : project.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {project.status}
                  </span>
                </div>
              </div>

            
              <div className="tasks mt-4">
                <h4 className="text-lg font-semibold text-gray-700">Tasks:</h4>
                <ul className="task-list space-y-4 mt-2">
                  {project.tasks.map((task, index) => (
                    <li key={index} className="task-item bg-gray-100 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{task.title}</span>
                        <span className={`text-sm font-semibold ${task.status === 'Completed' ? 'text-green-600' : task.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'}`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="progress-bar mt-2">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-sky-500 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm flex justify-between mt-1">
                          <span className="text-gray-500">{task.progress}%</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
               ))}



        </div>
      )}
    </div>
  );
};

export default ProgressTracking;
