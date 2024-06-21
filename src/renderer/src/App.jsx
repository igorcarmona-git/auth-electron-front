import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import ReportsPage from './pages/ReportsPage';
import AllActive_users from './components/reports/AllActive_users';

function App() {
  useEffect(() => {
    console.log('Entrou no App');
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <div>
              <Header />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/reports/r1" element={
          <ProtectedRoute>
            <AllActive_users />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
