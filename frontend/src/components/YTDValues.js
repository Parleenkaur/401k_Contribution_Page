import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

function YTDValues({ salary, ytdContributions, payFrequency }) {
  return (
    <Box sx={{ my: 3 }}>
      <Typography 
  variant="h6" 
  gutterBottom 
  sx={{ textAlign: 'center' }}
>
  Your 401(k) Information
</Typography>

      <Grid 
        container 
        spacing={2} 
        justifyContent="center"     // centers the 3 cards
      >
        {/* 1st Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              bgcolor: '#f5f5f5', 
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Annual Salary
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              ${salary.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* 2nd Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              bgcolor: '#f5f5f5', 
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              YTD Contributions
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
              ${ytdContributions.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* 3rd Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              bgcolor: '#f5f5f5', 
              height: '100%', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Pay Frequency
            </Typography>
            <Typography variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}>
              {payFrequency}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default YTDValues;
