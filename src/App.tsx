import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/components/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BrowseCourses from "./pages/BrowseCourses";
import CreateCourse from "./pages/CreateCourse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Student Routes */}
        <Route 
          path="/browse" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <BrowseCourses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-courses" 
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor']}>
              <div className="p-6"><h1 className="text-3xl font-bold">My Courses</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/progress" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <div className="p-6"><h1 className="text-3xl font-bold">My Progress</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />

        {/* Instructor Routes */}
        <Route 
          path="/create-course" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <CreateCourse />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/students" 
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <div className="p-6"><h1 className="text-3xl font-bold">My Students</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-6"><h1 className="text-3xl font-bold">Manage Users</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-6"><h1 className="text-3xl font-bold">Manage Courses</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-6"><h1 className="text-3xl font-bold">Analytics</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />

        {/* Shared Routes */}
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <div className="p-6"><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>
            </ProtectedRoute>
          } 
        />

        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
