import React from 'react';
import AppBarComponent from '../Components/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from '../Components/SignIn';

export default function Home() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarComponent />
        <SignIn />
        </Box>
  );
}