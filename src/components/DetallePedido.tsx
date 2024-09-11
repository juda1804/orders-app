import React from 'react';
import { Typography, Container } from '@mui/material';

const DetallePedido: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalles del Pedido
      </Typography>
      <Typography variant="body1">
        Aquí se pueden mostrar más detalles o configuraciones específicas.
      </Typography>
    </Container>
  );
}

export default DetallePedido;
