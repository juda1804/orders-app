import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mis Ordenes Dropshipping
        </Typography>
        <Button color="inherit" component={Link} to="/">Resumen estado Pedidos</Button>
        <Button color="inherit" component={Link} to="/pedidos">Tabla de Pedidos</Button>
        <Button color="inherit" component={Link} to="/detalles">Detalles</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
