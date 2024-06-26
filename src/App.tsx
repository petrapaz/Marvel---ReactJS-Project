
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContent from './components/AppContent';
import ComicDetails from './components/ComicDetails';
import './styles/index.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/comic/:id" element={<ComicDetails />} />
    </Routes>
  </Router>
);

export default App;
