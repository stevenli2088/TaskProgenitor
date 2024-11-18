import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <Box>
        <h1>Task Progenitor Home</h1>
        <Button variant="contained" color="primary" onClick={() => navigate('/taskprogenisis')}>
          Start Creating Tasks
        </Button>
      </Box>
    </div>
  );
}

export default HomePage;
