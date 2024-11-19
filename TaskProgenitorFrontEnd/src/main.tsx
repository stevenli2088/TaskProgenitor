import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from './contexts/AuthContext';

import AllTasksPage from './pages/AllTasksPage/AllTasksPage.tsx'
import HomePage from './pages/HomePage/HomePage.tsx'
import SignInPage from './pages/SignInPage/SignInPage.tsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary'; // New ErrorBoundary component

const router = createBrowserRouter ([
  {
    path:'/taskprogenisis',
    element: <ProtectedRoute><AllTasksPage /></ProtectedRoute>
  },
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/signin',
    element: <SignInPage />
  },
  {
    path:'/signup',
    element: <SignUpPage />
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
