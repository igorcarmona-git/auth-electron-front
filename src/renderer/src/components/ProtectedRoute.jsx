import React from 'react';
import { Navigate } from 'react-router-dom';

//ProtectedRoute é uma função que recebe uma propriedade children.
function ProtectedRoute({ children}) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;