import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import Logo from '../logo.png'; // Update the path to your logo

const Navbar: React.FC = () => {
    return (
        <Box
            sx={{
                width: '220px',
                bgcolor: '#f4f4f4',
                height: '100vh',
                position: 'fixed',
                padding: '16px',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add shadow for depth
            }}
        >
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                <Typography variant="h6" component="h1">My Snippet App</Typography> {/* Update the title as needed */}
            </Box>

            {/* Navigation Links */}
            <List>
                <ListItemButton component={Link} to="/create-snippet" sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}>
                    <ListItemText primary="Create Snippet" />
                </ListItemButton>
                <ListItemButton component={Link} to="/snippet-list" sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}>
                    <ListItemText primary="Snippet List" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Navbar;
