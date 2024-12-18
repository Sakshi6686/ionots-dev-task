// utils/projectGenerator.js

const projectTitles = ["Data Analysis", "AI Model", "Chatbot Development", "Blockchain", "Predictive Analytics", "Image Classification"];
const projectSkills = ["Python", "Machine Learning", "NLP", "Deep Learning", "TensorFlow", "React.js"];
const projectDescriptions = [
  "Focuses on using machine learning to predict outcomes based on data.",
  "Build an AI model to classify images or text.",
  "Develop a chatbot using NLP and AI techniques.",
  "Create a decentralized application using blockchain technology.",
  "Apply machine learning models to predict future trends.",
  "Classify and process images using deep learning techniques."
];

let projectCounter = 1; // Start project IDs from 1

function generateProjects(numProjects) {
  let projects = [];
  
  for (let i = 0; i < numProjects; i++) {
    const title = `${projectTitles[i % projectTitles.length]} Project ${projectCounter++}`;
    const description = projectDescriptions[i % projectDescriptions.length];
    const skills = [projectSkills[i % projectSkills.length], projectSkills[(i + 1) % projectSkills.length]];

    projects.push({
      id: projectCounter, // Unique ID for each project
      title,
      description,
      skills,
    });
  }

  return projects;
}

module.exports = { generateProjects };
