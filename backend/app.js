
const express = require('express');
const cors = require('cors');

const db=require('./config/dbConfig')

const dotenv = require('dotenv');

 
const authRoutes = require('./routes/auth');
const userRouter=require('./routes/user');
 
dotenv.config();
const app = express();

 
app.use(express.json());  
app.use(cors());  

 
console.log("hi1");

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);

 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
