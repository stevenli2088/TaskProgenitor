
import React, { Component, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h5">Something went wrong.</Typography>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;