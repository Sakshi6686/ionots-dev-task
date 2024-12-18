
const express = require('express');
const cors = require('cors');

const db=require('./config/dbConfig')
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

 
const authRoutes = require('./routes/auth');
const userRouter=require('./routes/user');
const projectsRouter=require('./routes/projects');
const assignProjectsTask = require('./tasks/projectAssigner');

 
dotenv.config();
const app = express();

 
app.use(express.json());  
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://ionots-dev-task-frontend.onrender.com', // Replace with your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));







// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads folder created.');
}
 
console.log("hi1");

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
console.log("HIII");

app.use('/api/manage-projects', projectsRouter);

assignProjectsTask();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
