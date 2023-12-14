import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function StoreCard(props) {
  return (
    <Card variant='outlined' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" sx={{fontWeight: "bold", color: "#121212"}} component="div">
          {props.heading}
        </Typography>
        <Typography sx={{ fontSize: 12, }} color="text.secondary" gutterBottom>
          {props.subheading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subtitle}
        </Typography>
        <Typography variant="body2">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
