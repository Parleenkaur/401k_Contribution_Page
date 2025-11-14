import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Button, CircularProgress, Alert, Snackbar, Grid } from '@mui/material';
import Title from './components/Title';
import ContributionType from './components/ContributionType';
import ContributionRate from './components/ContributionRate';
import YTDValues from './components/YTDValues';
import RetirementOverview from './components/RetirementOverview';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [contributionType, setContributionType] = useState('percentage');
  const [contributionRate, setContributionRate] = useState(0);
  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/user-data');
      const data = await response.json();
      setUserData(data);
      setContributionType(data.contributionType);
      setContributionRate(data.contributionRate);
      setLoading(false);
    } catch (err) {
      setError('Failed to load user data. Please try again.');
      setLoading(false);
      console.error('Error fetching user data:', err);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/update-contribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contributionType, contributionRate })
      });
      
      if (response.ok) {
        setSuccessMessage('Contribution settings updated successfully!');
        fetchUserData(); // Refresh data
      }
    } catch (err) {
      setError('Failed to update contribution settings. Please try again.');
      console.error('Error updating contribution:', err);
      setLoading(false);
    }
  };
  
  if (loading && !userData) {
    return (
      <Container className="app-container">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container className="app-container">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Title />
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          {userData && (
            <YTDValues 
              salary={userData.salary}
              ytdContributions={userData.ytdContributions} 
              payFrequency={userData.payFrequency}
            />
          )}
          
          {/* Side-by-side contribution settings with proper alignment */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ContributionType 
                  contributionType={contributionType} 
                  setContributionType={setContributionType} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {userData && (
                  <ContributionRate 
                    contributionType={contributionType} 
                    contributionRate={contributionRate} 
                    setContributionRate={setContributionRate}
                    salary={userData.salary}
                    payFrequency={userData.payFrequency}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
          
          {userData && (
            <RetirementOverview
              age={userData.age}
              contributionType={contributionType}
              contributionRate={contributionRate}
              salary={userData.salary}
              ytdContributions={userData.ytdContributions}
            />
          )}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              sx={{ textTransform: 'uppercase' }} // Make the button text all caps
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage('')}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;