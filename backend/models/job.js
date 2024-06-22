// server/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  maths: Number,
  chemistry: Number,
  english: Number,
  certificates: String,
  technologies: String,
  hackathons: Number,
  recommendedJob: String
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
