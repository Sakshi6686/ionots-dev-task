import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';
import toast from 'react-hot-toast'; 
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      toast.error('Both fields are required');  
      return;
    }

    try {
     
      const response = await axios.post('https://ionots-dev-task-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

    
      localStorage.setItem('token', response.data.token);
            console.log('token', localStorage.getItem('token'));
            
      
      toast.success('Login successful! Redirecting to the dashboard...');
      
       
      navigate('/dashboard');
    } catch (error) {
   
      if (error.response && error.response.data) {

        
        setError(error.response.data.message);  
        toast.error(error.response.data.message);  
      } else {
        setError('Something went wrong. Please try again.');


            toast.error('Something went wrong. Please try again.');  
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Login</h2>
        
      
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p className="text-center mt-4">
          Don't have an account? <a href="/signup" className="text-sky-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
