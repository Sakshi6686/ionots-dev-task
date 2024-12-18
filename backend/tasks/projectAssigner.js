const cron = require('node-cron');
const User = require('../models/User');
const { generateProjects } = require('./projectGenerator');

const assignProjectsTask = () => {
  cron.schedule('0 0 * * *', async () => { // Run at midnight daily
    console.log('Running project auto-assignment task...');
    
    try {
      const users = await User.find(); // Fetch all users
      console.log(`Fetched ${users.length} users`); // Log the number of users

      for (const user of users) {
        const assignedProjectIds = user.assignedProjects.map(ap => ap.projectId);
        const generatedProjects = generateProjects(10);

        const newProjects = generatedProjects.filter(
          (project) =>
            project.skills.some((skill) => user.skills.includes(skill)) &&
            !assignedProjectIds.includes(project.id)
        );

        if (newProjects.length > 0) {
          const projectToAssign = newProjects[0];
          user.assignedProjects.push({
            projectId: projectToAssign.id,
            projectTitle: projectToAssign.title,
            projectDescription: projectToAssign.description,
            projectSkills: projectToAssign.skills,
            status: 'Not Started',
            score: 0,
          });
          await user.save();
          console.log(`Assigned project "${projectToAssign.title}" to ${user.username}`);
        }
      }

      console.log('Project auto-assignment completed.');
    } catch (err) {
      console.error('Error during project auto-assignment:', err);
    }
  });
};

module.exports = assignProjectsTask;
