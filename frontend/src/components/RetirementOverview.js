import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function RetirementOverview({ age, contributionType, contributionRate, salary, ytdContributions }) {
  // Calculate projected retirement savings
  const calculateRetirementSavings = () => {
    const currentAge = age;
    const retirementAge = 65;
    const yearsToRetirement = retirementAge - currentAge;
    const annualContribution = contributionType === 'percentage'
      ? (salary * (contributionRate / 100))
      : (contributionRate * 26); // Biweekly to annual
    
    // Assuming 7% average annual return
    const annualReturn = 0.07;
    
    // Current 401k balance (YTD contributions + any previous balance)
    const currentBalance = ytdContributions;
    
    // Future value formula: FV = P(1+r)^t + PMT*((1+r)^t - 1)/r
    const futureValue = currentBalance * Math.pow(1 + annualReturn, yearsToRetirement) +
                       annualContribution * (Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn;
    
    return Math.round(futureValue);
  };

  const projectedSavings = calculateRetirementSavings();
  
  // Format currency
  const formattedProjectedSavings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(projectedSavings);

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Paper elevation={0} sx={{ p: 3, bgcolor: '#e8f4fd', borderRadius: 2, borderLeft: '4px solid #1976d2' }}>
        <Typography variant="h6" gutterBottom>
          Retirement Overview
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Based on your current contribution rate and an estimated 7% annual return:
        </Typography>
        
        {/* Make the projected amount much more prominent */}
        <Box sx={{ 
          py: 3, 
          px: 3, 
          bgcolor: 'white', 
          borderRadius: 1, 
          mb: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Projected retirement savings at age 65:
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 'bold'
            }}
          >
            {formattedProjectedSavings}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Increasing your contribution by just 1% could significantly boost your retirement savings.
        </Typography>
      </Paper>
    </Box>
  );
}

export default RetirementOverview;