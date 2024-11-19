import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        navigate('/taskprogenisis');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
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
      <Typography variant="h4">Sign In</Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <form onSubmit={handleSignIn}>
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SignInPage;