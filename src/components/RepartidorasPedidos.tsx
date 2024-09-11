// src/components/RepartidorasPedidos.tsx
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Pedido } from '../types';

interface RepartidorasPedidosProps {
  pedidos: Pedido[];
}

const RepartidorasPedidos: React.FC<RepartidorasPedidosProps> = ({ pedidos }) => {
  const contadorRepartidoras = pedidos.reduce((acc, pedido) => {
    acc[pedido.repartidora] = (acc[pedido.repartidora] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Grid container spacing={1}>
        {Object.entries(contadorRepartidoras).map(([repartidora, cantidad]) => (
          <Grid item xs={6} sm={4} md={2} key={repartidora}>
            <Box sx={{ padding: 1, textAlign: 'center', backgroundColor: '#e0f7fa', borderRadius: 1 }}>
              <Typography variant="subtitle2">{repartidora}</Typography>
              <Typography variant="h6">{cantidad}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RepartidorasPedidos;
