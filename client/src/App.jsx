import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeForm from './pages/ResumeForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/resume/new" element={
          <PrivateRoute><ResumeForm /></PrivateRoute>
        } />
        <Route path="/resume/:id" element={
          <PrivateRoute><ResumeForm /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;