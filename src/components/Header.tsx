import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mis Ordenes Dropshipping
        </Typography>
        <Button color="inherit" component={Link} to="/">Resumen estado Pedidos</Button>
        <Button color="inherit" component={Link} to="/pedidos">Tabla de Pedidos</Button>
        <Button color="inherit" component={Link} to="/carga-orden">Cargar Orden</Button>
        <Button color="inherit" onClick={onLogout}>Cerrar sesión</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
