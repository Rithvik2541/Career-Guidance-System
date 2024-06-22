// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const parseCSV = require('../utils/csvParser');

let csvData = [];

parseCSV('jobs.csv')
  .then(data => {
    csvData = data;
    console.log('CSV data loaded successfully.');
  })
  .catch(err => console.error('Error loading CSV data:', err));

router.post('/recommend', (req, res) => {
  const userInput = req.body;
  const recommendedJob = findRecommendedJob(userInput, csvData);
  res.json({ recommendedJob });
});

function findRecommendedJob(userInput, data) {
  for (let job of data) {
    if (job.maths == userInput.maths &&
        job.chemistry == userInput.chemistry &&
        job.english == userInput.english &&
        job.certificates == userInput.certificates &&
        job.technologies == userInput.technologies &&
        job.hackathons == userInput.hackathons) {
      return job['suggested job role'];
    }
  }
  return 'No suitable job found';
}

module.exports = router;
