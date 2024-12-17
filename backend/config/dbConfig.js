
const mongoose=require("mongoose")
const dotenv=require('dotenv')
dotenv.config();
 
mongoose.connect(process.env.MONGO_URL);

 
const db = mongoose.connection;

 
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports=db;