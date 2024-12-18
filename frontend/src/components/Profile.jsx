import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import toast from 'react-hot-toast'; 
import axios from 'axios';  

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    skills: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');  
        if (!token) {
          toast.error('You are not logged in!');
          navigate('/');  
          return;
        }

        const response = await axios.get('https://ionots-dev-task-backend.onrender.com/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data;
        setUser({
          ...userData,
          skills: userData.skills || [],
        });
        setUpdatedUser({
          ...userData,
          skills: userData.skills || [],
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          'https://ionots-dev-task-backend.onrender.com/api/user/profile',
          {
            name: updatedUser.name,
            email: updatedUser.email,
            skills: updatedUser.skills,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setUser({
          ...response.data.user,
          skills: response.data.user.skills || [],
        });
        setUpdatedUser({
          ...response.data.user,
          skills: response.data.user.skills || [],
        });
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update profile');
      }
    }
  
    setIsEditing(!isEditing);  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
    toast.success('Logged out successfully');
  };

  return (
    <div className="container p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">User Profile</h2>
      
      <div className="profile-card bg-white shadow-md rounded-lg p-6">
        <div className="profile-info">
          <div className="info-row">
            <span className="font-semibold text-gray-700">Name:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <span className="text-gray-600">{user.name}</span>
            )}
          </div>
          <div className="info-row">
            <span className="font-semibold text-gray-700">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <span className="text-gray-600">{user.email}</span>
            )}
          </div>
          <div className="info-row">
            <span className="font-semibold text-gray-700">Skills:</span>
            {isEditing ? (
              <input
                type="text"
                name="skills"
                value={updatedUser.skills?.join(', ')}  
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    skills: e.target.value.split(',').map((skill) => skill.trim()),
                  })
                }
                className="input-field"
              />
            ) : (
              <span className="text-gray-600">
                {user.skills?.length ? user.skills.join(', ') : 'No skills added'}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleEditToggle}
            className="btn btn-primary"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-danger"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
