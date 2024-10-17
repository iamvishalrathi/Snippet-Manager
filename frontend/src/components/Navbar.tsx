import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText, Typography, ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Logo from '../assets/logo.png'; // Update the path to your logo

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
                <Typography variant="h6" component="h1">Snippet Manager</Typography> {/* Update the title as needed */}
            </Box>

            {/* Navigation Links */}
            <List>
                {/* Create Snippet Link with Home Icon */}
                <ListItemButton component={Link} to="/create-snippet" sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Snippet" />
                </ListItemButton>

                {/* Snippet List Link with List Icon */}
                <ListItemButton component={Link} to="/snippet-list" sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Snippet List" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Navbar;
