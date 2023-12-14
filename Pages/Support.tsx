import React from 'react';
import AppBarComponent from '../Components/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ContactForm from '../Components/ContactForm';

export default function Support() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarComponent />
        <ContactForm />
        </Box>
  );
}