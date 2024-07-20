// Backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000; // Define the port for the server

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/conferences', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Conference Schema
const conferenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Conference = mongoose.model('Conference', conferenceSchema);

// Routes
// GET all conferences
app.get('/api/conferences', async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new conference
app.post('/api/conferences', async (req, res) => {
  const conference = new Conference({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newConference = await conference.save();
    res.status(201).json(newConference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
