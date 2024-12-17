import { useState, useEffect } from 'react';

const ScoringSystem = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    const fetchScores = () => {
      setLoading(true);
       
      setTimeout(() => {
        setProjects([
          {
            id: 1,
            title: 'Project A',
            description: 'Data analysis on sales data',
            totalScore: 95,
            tasks: [
              { title: 'Data Collection', score: 20, maxScore: 25 },
              { title: 'Data Cleaning', score: 30, maxScore: 35 },
              { title: 'Model Training', score: 45, maxScore: 45 },
            ]
          },
          {
            id: 2,
            title: 'Project B',
            description: 'AI model for recommendation system',
            totalScore: 60,
            tasks: [
              { title: 'Data Collection', score: 10, maxScore: 15 },
              { title: 'Model Design', score: 25, maxScore: 40 },
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchScores();
  }, []);

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Scoring System</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading project scores...</div>
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
                <h4 className="text-lg font-semibold text-gray-700">Score Breakdown:</h4>
                <ul className="task-list space-y-4 mt-2">
                  {project.tasks.map((task, index) => (
                    <li key={index} className="task-item bg-gray-100 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{task.title}</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {task.score} / {task.maxScore}
                        </span>
                      </div>
                      <div className="progress-bar mt-2">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-sky-500 h-2 rounded-full"
                            style={{ width: `${(task.score / task.maxScore) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

             
              <div className="total-score mt-4">
                <span className="text-sm text-gray-500">Total Score:</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(project.totalScore / project.tasks.reduce((sum, task) => sum + task.maxScore, 0)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-gray-500">{project.totalScore}</span>
                  <span className={`font-semibold ${project.totalScore >= 80 ? 'text-green-600' : project.totalScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {project.totalScore >= 80 ? 'Excellent' : project.totalScore >= 50 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoringSystem;
