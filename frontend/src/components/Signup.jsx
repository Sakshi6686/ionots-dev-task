import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Predefined list of skills
  const predefinedSkills = [
    "Data Analysis", 
    "AI Model", 
    "Chatbot Development", 
    "Blockchain", 
    "Predictive Analytics", 
    "Image Classification"
  ];

  // Handle adding a skill
  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://ionots-dev-task-backend.onrender.com/api/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
        skills
      });

      if (response.data.success) {
        toast.success('User registered successfully!');
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('An error occurred during signup');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Skills Section */}
          <div className="input-group">
            <label htmlFor="skills" className="input-label">Skills</label>
            <div className="skills-options">
              {predefinedSkills.map((skill, index) => (
                <button
                  type="button"
                  key={index}
                  className={`skill-btn ${skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => handleAddSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="skills-list mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/" className="text-sky-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
