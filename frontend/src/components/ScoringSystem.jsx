import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ProjectCompletionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);

      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('No auth token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          'https://ionots-dev-task-backend.onrender.com/api/manage-projects/get-number-of-accepted-completed-projects',
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const data = await response.json();

        if (data.success) {
          const completed = data.completed.length;
          const accepted = data.accepted.length;
          const total = completed + accepted;

          const formattedData = [
            { name: 'Completed', value: completed, percent: (completed / total) * 100 },
            { name: 'Not Completed', value: accepted, percent: (accepted / total) * 100 },
          ];

          setChartData(formattedData);
        } else {
          console.error('Failed to fetch data:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const COLORS = ['#4CAF50', '#FF5733']; // Green for completed, Red for not completed

  const renderCustomTooltip = ({ payload, active }) => {
    if (active && payload && payload.length) {
      const { name, value, percent } = payload[0].payload;
      return (
        <div className="bg-white text-gray-800 p-3 rounded-lg shadow-md">
          <p className="font-bold">{name}</p>
          <p>Count: {value}</p>
          <p>Percentage: {percent.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-100 to-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-8">
        Project Completion Distribution
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading chart data...</div>
      ) : chartData.length > 0 ? (
        <div className="flex justify-center items-center">
          <PieChart width={450} height={450}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${percent.toFixed(1)}%`
              }
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={renderCustomTooltip} />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <div className="text-center text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default ProjectCompletionChart;
