import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryPage from './pages/admin/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </Router>
  )
}

export default App
