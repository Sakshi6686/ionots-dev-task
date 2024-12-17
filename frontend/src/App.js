import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import PrivateRoute from './components/PrivateRoute';  
import Layout from './Layout';  

import 'react-toastify/dist/ReactToastify.css'; 

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
      </Routes>

      
       
    </BrowserRouter>
  );
}

export default App;
