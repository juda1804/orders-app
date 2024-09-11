// src/components/RepartidorasPedidos.tsx
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Pedido } from "../types";
import { formatearCOP } from "../utils/currency";

interface EstadisticasPedidosProps {
  pedidos: Pedido[];
}

const EstadisticasPedidos: React.FC<EstadisticasPedidosProps> = ({
  pedidos,
}) => {
  // Filtrar y sumar los valores para devoluciones
  const totalDevoluciones = pedidos
    .filter((pedido) => pedido.status === "DEVOLUCION")
    .reduce((sum, pedido) => sum + parseFloat(pedido.costoFlete), 0);

  // Filtrar y sumar los valores para entregados
  const totalEntregados = pedidos
    .filter((pedido) => pedido.status === "ENTREGADO")
    .reduce((sum, pedido) => sum + parseFloat(pedido.valorTotal), 0);

  const genanciaEntregado = pedidos
    .filter((pedido) => pedido.status === "ENTREGADO")
    .reduce((sum, pedido) => sum + parseFloat(pedido.valorTotal) - parseFloat(pedido.costoFlete) - parseFloat(pedido.costoProductos ?? 0) , 0);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#e8f5e9",
              borderRadius: 1,
            }}>
            <Typography variant="subtitle2">Total Entregado</Typography>
            <Typography variant="h6">${formatearCOP(totalEntregados)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#e3f2fd",
              borderRadius: 1,
            }}>
            <Typography variant="subtitle2">Ganancia en entregados</Typography>
            <Typography variant="h6">${formatearCOP(genanciaEntregado)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#ffebee",
              borderRadius: 1,
            }}>
            <Typography variant="subtitle2">Valor Devoluciones</Typography>
            <Typography variant="h6">${formatearCOP(totalDevoluciones)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#ffebee",
              borderRadius: 1,
            }}>
            <Typography variant="subtitle2">Flujo de caja</Typography>
            <Typography variant="h6"> aprox ${formatearCOP(genanciaEntregado - totalDevoluciones)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EstadisticasPedidos;
