import React from 'react';
import { Box, Typography, Slider, TextField } from '@mui/material';

function ContributionRate({ contributionType, contributionRate, setContributionRate, salary, payFrequency }) {
  const getPayAmount = () => {
    switch (payFrequency) {
      case 'weekly':
        return salary / 52;
      case 'biweekly':
        return salary / 26;
      case 'monthly':
        return salary / 12;
      default:
        return salary / 26; // Default to biweekly
    }
  };

  const handleSliderChange = (event, newValue) => {
    setContributionRate(newValue);
  };
  
  const handleInputChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      // Cap percentage at 100% and dollar amount reasonably
      if (contributionType === 'percentage') {
        setContributionRate(Math.min(value, 100));
      } else {
        // For dollar amount, cap at half of biweekly pay
        const payAmount = getPayAmount();
        setContributionRate(Math.min(value, payAmount / 2));
      }
    }
  };

  const maxValue = contributionType === 'percentage' ? 100 : (getPayAmount() / 2);
  
  return (
    
    <Box sx={{ 
      height: '50%',
      p: 3, 
      bgcolor: '#f9f9f9', 
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      mt: 5 ,
    
    }}>
      <Typography variant="h6" gutterBottom>
        {contributionType === 'percentage' 
          ? 'Contribution Percentage' 
          : 'Contribution Amount ($)'
        }
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Slider
          value={contributionRate}
          onChange={handleSliderChange}
          aria-labelledby="contribution-slider"
          min={0}
          max={maxValue}
          step={contributionType === 'percentage' ? 1 : 10}
          sx={{ mr: 2, flexGrow: 1 }}
        />
        <TextField
          value={contributionRate}
          onChange={handleInputChange}
          type="number"
          InputProps={{
            endAdornment: contributionType === 'percentage' ? '%' : '$',
            inputProps: {
              min: 0,
              max: maxValue,
              step: contributionType === 'percentage' ? 1 : 10
            }
          }}
          sx={{ width: '100px' }}
        />
      </Box>
      
      {/* Simple impact display */}
      <Box sx={{ mt: 2, flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant="body2" color="text.secondary">
          {contributionType === 'percentage' 
            ? `${contributionRate}% of your salary (${formatCurrency(salary * contributionRate / 100)}/year)` 
            : `${formatCurrency(contributionRate)} per paycheck (${formatCurrency(contributionRate * (payFrequency === 'weekly' ? 52 : payFrequency === 'biweekly' ? 26 : 12))}/year)`
          }
        </Typography>
      </Box>
    </Box>
  );
}

// Helper function to format currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export default ContributionRate;