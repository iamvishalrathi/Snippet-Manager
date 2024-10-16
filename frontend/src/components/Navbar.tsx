import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';

const Navbar: React.FC = () => {
    return (
        <Box
            sx={{
                width: '250px',
                bgcolor: '#f4f4f4',
                height: '100vh',
                position: 'fixed',
                padding: '16px',
            }}
        >
            <List>
                <ListItemButton component={Link} to="/create-snippet">
                    <ListItemText primary="Create Snippet" />
                </ListItemButton>
                <ListItemButton component={Link} to="/snippet-list">
                    <ListItemText primary="Snippet List" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Navbar;
