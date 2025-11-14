import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function ContributionType({ contributionType, setContributionType }) {
  return (
   <Box 
  sx={{ 
    background: '#94c3f3ff',   // light blue
    padding: 0.5,
    borderRadius: 1,
    mt: 5                    // <-- THIS FIXES THE OVERLAP
  }}
>
  <Box
    sx={{ 
      height: '100%',
      p: 3, 
      bgcolor: '#f9f9f9', 
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Typography variant="h6" gutterBottom>
      Contribution Type
    </Typography>

    <RadioGroup
      value={contributionType}
      onChange={(e) => setContributionType(e.target.value)}
      sx={{ mt: 2 }}
    >
      <FormControlLabel 
        value="percentage" 
        control={<Radio />} 
        label="Percentage of Paycheck" 
      />

      <FormControlLabel 
        value="amount" 
        control={<Radio />} 
        label="Fixed Dollar Amount" 
        sx={{ mt: 1 }}
      />
    </RadioGroup>
  </Box>
</Box>


  );
}

export default ContributionType;