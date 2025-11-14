const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a data file if it doesn't exist
const dataFilePath = path.join(__dirname, 'data.json');
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({
    contributionType: 'percentage',
    contributionRate: 5,
    salary: 10000,
    payFrequency: 'biweekly',
    ytdContributions: 8500,
    age: 30
  }));
}

// Get user 401k data
app.get('/api/user-data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});

// Update contribution settings
app.post('/api/update-contribution', (req, res) => {
  try {
    const { contributionType, contributionRate } = req.body;
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    // Update only contribution settings
    data.contributionType = contributionType;
    data.contributionRate = contributionRate;
    
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contribution settings' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
