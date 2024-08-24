import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import UserView from './components/UserView';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserView />} />
            <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
            <Route
                path="/dashboard"
                element={isAdmin ? <Dashboard /> : <Navigate to="/admin" />}
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;