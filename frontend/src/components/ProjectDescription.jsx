import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [uploadMessage, setUploadMessage] = useState(''); // State for file upload feedback

  // Fetch project description
  const fetchProject = async () => {
    setLoading(true);

    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `/api/manage-projects/get-project-description/${projectId}`,
        {
            headers: { Authorization: `Bearer ${authToken}` },
        }
       
      );

      if (response.data.success) {
        setProject(response.data.project);
        setFile(project.uploadedFile)
      } else {
        setToastMessage('Failed to fetch project details');
      }
    } catch (err) {
      setToastMessage('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('projectFile', file); // Append the file with a field name "projectFile"

    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error('No auth token found');
      setToastMessage('Authentication failed');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/api/manage-projects/upload-project-file/${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        setUploadMessage('File uploaded successfully!');
        setFile(response.data.filePath);
        fetchProject(); // Refetch the project details to update the uploaded file section
      } else {
        setUploadMessage('Failed to upload file.');
      }
    } catch (err) {
      console.error(err);
      setUploadMessage('Server error occurred while uploading the file.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {toastMessage && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {toastMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading project...</div>
      ) : (
        <>
          {/* Project Details */}
          <h2 className="text-3xl font-semibold mb-4">{project.title}</h2>
          <p className="text-gray-700 mb-4">{project.description}</p>

          {/* Project Skills */}
          <div className="mb-4">
            <span className="text-lg font-semibold">Skills Required:</span>{' '}
            <span className="text-gray-600">
              {project.skills && project.skills.length > 0
                ? project.skills.join(', ')
                : 'No skills specified'}
            </span>
          </div>

          {/* File Upload Section */}
          <form onSubmit={handleFileUpload} className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Upload Your Project Work (PDF):
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload File
            </button>
          </form>

          {/* Upload Message */}
          {uploadMessage && (
            <div className="text-green-500 font-medium mb-4">{uploadMessage}</div>
          )}

          {/* Display Uploaded File */}
          {project.uploadedFile && (
            <div className="mb-4">
              <span className="text-lg font-semibold">Uploaded File:</span>{' '}
              <a
                href={`http://localhost:5000/${project.uploadedFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Uploaded File
              </a>
            </div>
          )}

          {/* Back Button */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
