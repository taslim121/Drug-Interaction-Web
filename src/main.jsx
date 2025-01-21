import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import AuthLayout from './routes/Auth/Auth.jsx';
import Home from './routes/Home.jsx';
import { createBrowserRouter } from "react-router-dom";
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoute from './routes/Auth/PrivateRoute.jsx';
import Profile from './routes/Hcp/Profile.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/auth" element={<AuthLayout />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
