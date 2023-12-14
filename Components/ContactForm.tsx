import React from 'react';
import {
  Box, 
  Button, 
  Container, 
  Grid, 
  Link,
  TextField,
  Typography } from '@mui/material';

const ContactForm: React.FC = () => {
  return (
    <Container maxWidth="xs">
    <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          お問い合わせ
        </Typography>

        <Box component="form" noValidate sx={{ mt:1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="お名前"
            name="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="contact"
            label="お問い合わせ内容"
            name="contact"
            multiline={true}
            rows={6}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt:3, mb:2 }}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;