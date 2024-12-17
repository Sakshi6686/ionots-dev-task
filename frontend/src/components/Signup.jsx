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
  const [skillInput, setSkillInput] = useState('');  
  const navigate = useNavigate();  

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);


      setSkillInput(''); 
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill)); 


  };

  const handleSignup = async (e) => {
    e.preventDefault();

     
    if (password !== confirmPassword) {


      toast.error('Passwords do not match');  
      return;
    }

    try {
    
      const response = await axios.post('/api/auth/signup', { 
        name, 
        email, 
        password, 
        confirmPassword, 
        skills 
      });

      console.log(response.data,"1");
      console.log(response.data.success,"1");
      if (response.data.success) {
        console.log(response.data);
        console.log(response.data.success);

        
        toast.success('User registered successfully!'); 
        navigate('/');  
      } else {
        toast.error(response.data.message);  
      }
    } catch (err) {
    
      console.log(err.message);

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
 
          <div className="input-group">
            <label htmlFor="skills" className="input-label">Skills</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="input-field"
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn btn-secondary"
              >
                Add
              </button>
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
