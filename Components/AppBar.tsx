import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//717171 navItems

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: 'ホーム', link: '/' },
  { label: 'サポート', link: '/support' },
  { label: '店舗様ログイン', link: '/store' },
];

export default function AppBarComponent(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider/>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              {item.link === '/store' ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#121212' }}>
                  <ListItemText primary={item.label} />
                </a>
              ) : (
                <Link to={item.link} style={{ textDecoration: 'none', color: '#121212' }}>
                  <ListItemText primary={item.label} />
                </Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" 
      sx={{ 
        backgroundColor: '#fff', 
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', 
        height: '56px',
        display: 'block'
        }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src="images/logo.png" 
           alt="Sukiariロゴ"
           style={{ maxHeight: '32px', width: 'auto' }} 
           />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
             {navItems.map((item) => (
              <Button key={item.label} sx={{ color: '#121212' }}>
                {item.link === '/store' ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#121212' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.link} style={{ textDecoration: 'none', color: '#121212' }}>
                    {item.label}
                  </Link>
                )}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#121212' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}