const express = require('express');
const router = express.Router();
const User = require('../models/User');  
const authenticateToken = require('../middlewares/authenticateToken');
const projects=require('../data/projects');
const multer = require('multer');
 

  router.get('/assign-projects', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Filter projects matching user's skills
        const availableProjects = projects.filter((project) =>
            project.skills.some((skill) => user.skills.includes(skill))
        );

        // Exclude already assigned projects
        const assignedProjectIds = user.assignedProjects.map(ap => ap.projectId);
        const newProjects = availableProjects.filter(project => !assignedProjectIds.includes(project.id));
console.log(newProjects,"new");

        // Assign new projects
        for (let i = 0; i < 10 && i < newProjects.length; i++) {
          const project = newProjects[i];
          user.assignedProjects.push({
              projectId: project.id,
              projectTitle: project.title,
              projectDescription: project.description,
              projectSkills: project.skills,
              status: 'Not Started',
              score: 0,
          });
      }

        await user.save();
console.log(user.assignedProjects,"assigned");

        res.json({ success: true, projects: user.assignedProjects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route 2: Get All Assigned Projects
router.get('/get-all-projects', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, projects: user.assignedProjects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.get('/get-project-description/:projectId', authenticateToken, async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const project = user.assignedProjects.find((pr) => pr.projectId === parseInt(projectId));

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // If the project is found, return it
    res.json({ success: true, project: project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/change-status-accepted/:projectId', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const {projectId } =req.params;
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const projectIndex = user.assignedProjects.findIndex(
        (project) => project.projectId === parseInt(projectId)
      );
  
      if (projectIndex === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
  
      // Update project status to "Accepted"
      user.assignedProjects[projectIndex].status = 'Accepted';
  
      // Save the updated user document
      await user.save();
  
      res.json({
        success: true,
        message: 'Project status updated to Accepted',
        updatedProject: user.assignedProjects[projectIndex],
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/get-all-accepted-projects', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const acceptedProjects=user.assignedProjects.filter((pr)=>pr.status==="Accepted");
      res.json({ success: true, acceptedProjects: acceptedProjects });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be saved in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  },
});

const upload = multer({ storage });

// File upload route
router.post('/upload-project-file/:projectId',authenticateToken, upload.single('projectFile'), async (req, res) => {
  const { projectId } = req.params;
  const userId=req.user.id;

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Update the assigned project in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the project in the user's assignedProjects
    const projectIndex = user.assignedProjects.findIndex(
      (p) => p.projectId === Number(projectId)
    );

    if (projectIndex===-1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Update the project details
    // project.uploadedFile = req.file.path; // Save file path
    // project.status = 'Completed'; // Update status

    user.assignedProjects[projectIndex].status='Completed';
    user.assignedProjects[projectIndex].uploadedFile = req.file.path; 
    // Save changes
    await user.save();
    console.log(user,"user");
    

    console.log(`File uploaded for project ${projectId}:`, req.file);

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filePath: req.file.path,
      updatedProject: user.assignedProjects[projectIndex],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});



router.get('/get-number-of-accepted-completed-projects', authenticateToken, async (req, res) => {
  const userId = req.user.id;
 
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const projectsCompleted = user.assignedProjects.filter(
        (project) => project.status==="Completed"
      );

      const projectAccepted=user.assignedProjects.filter(
        (project) => project.status==="Accepted"
      );
       
  
      
  
      res.json({
        success: true,
        accepted:projectAccepted,
        completed:projectsCompleted,
        
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;