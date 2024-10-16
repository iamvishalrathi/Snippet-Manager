import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateSnippet from './components/CreateSnippet';
import SnippetList from './components/SnippetList';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Box sx={{ marginLeft: '250px', padding: '16px' }}>
        <Routes>
          <Route path="/create-snippet" element={<CreateSnippet />} />
          <Route path="/snippet-list" element={<SnippetList />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;