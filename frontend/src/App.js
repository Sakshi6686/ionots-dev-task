import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import PrivateRoute from './components/PrivateRoute';  
import Layout from './Layout';  

import 'react-toastify/dist/ReactToastify.css'; 
 
import ScoringSystem from './components/ScoringSystem';
import UserProfile from './components/Profile';
import ProgressTracking from './components/ProgressTracking';
 
import RecommendedProjects from './components/RecommendedProjects';
import AssingedProjects from './components/ProgressTracking';
import ProjectDetails from './components/ProjectDescription';

const App = () => {
  return (
    <BrowserRouter>
    <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          } 
        />
         <Route 
          path="/project-assignment" 
          element={
            <PrivateRoute>
            <Layout>
            <RecommendedProjects />
            </Layout>
           
            </PrivateRoute>
          } 
        />
         <Route 
          path="/progress-tracking" 
          element={
            <PrivateRoute>
            <Layout>
            <AssingedProjects/>
            </Layout>
            
            </PrivateRoute>
          } 
        />
         <Route 
          path="/score-system" 
          element={
            <PrivateRoute>
            <Layout>
            <ScoringSystem />
            </Layout>
            
            </PrivateRoute>
          } 
        />
         <Route 
          path="/profile" 
          element={
            <PrivateRoute>
            
              <Layout>
              <UserProfile />
              </Layout>
            </PrivateRoute>
          } 
        />
        
         <Route 
    path="/project/:projectId" 
    element={
      <PrivateRoute>
        <Layout>
          <ProjectDetails />
        </Layout>
      </PrivateRoute>
    }
  />
      </Routes>

      
       
    </BrowserRouter>
  );
}

export default App;
