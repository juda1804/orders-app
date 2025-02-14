import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Resumen estado Pedidos', path: '/' },
    { text: 'Configuracion', path: '/configuracion' },
    { text: 'Tabla de Pedidos', path: '/pedidos' },
    { text: 'Cargar Orden', path: '/carga-orden' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mis Ordenes Dropshipping
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path} 
                  component={Link} 
                  to={item.path}
                  onClick={handleClose}
                >
                  {item.text}
                </MenuItem>
              ))}
              <MenuItem onClick={() => { handleClose(); onLogout(); }}>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                component={Link} 
                to={item.path}
              >
                {item.text}
              </Button>
            ))}
            <Button color="inherit" onClick={onLogout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
