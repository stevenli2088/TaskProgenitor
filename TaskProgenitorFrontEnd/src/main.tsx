import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AllTasksPage from './pages/AllTasksPage/AllTasksPage.tsx'
import HomePage from './pages/HomePage/HomePage.tsx'
// import './index.css'

const router = createBrowserRouter ([
  {
    path:'/taskprogenisis',
    element: <AllTasksPage />
  },
  {
    path:'/',
    element: <HomePage />
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <RouterProvider router={router} />
    </LocalizationProvider>
    </QueryClientProvider>
  </StrictMode>
)
