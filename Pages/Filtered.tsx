import React from 'react';
import AppBarComponent from '../Components/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import FilteredComponent from '../Components/FilteredComponent';

export default function Filterd(props) {
  // propsからデータを取得
  const all_store_data = props.all_store_data;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBarComponent />
      <Toolbar />

      {/* Here we wrap the MapComponent with Box and set flex to 1 */}
      <Box sx={{ flex: 1, width: '100%', height: '100%' }}>
        <FilteredComponent all_store_data={all_store_data} />
      </Box>
    </Box>
  );
}
