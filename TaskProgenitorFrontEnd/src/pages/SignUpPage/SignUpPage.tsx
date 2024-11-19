
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignUpPage: React.FC = () => {
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '2rem', 
        textAlign: 'center' 
      }}
    >
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSignUp}>
        <TextField label="Username" fullWidth margin="normal" required />
        <TextField label="Email" fullWidth margin="normal" required />
        <TextField label="Password" type="password" fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      </form>
    </Box>
  );
};

export default SignUpPage;