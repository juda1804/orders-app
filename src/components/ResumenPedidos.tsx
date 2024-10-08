import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pedido } from "../types";
import EstadisticasPedidos from "./EstadisticasPedidos";
import EstadoPedidos from "./estados-pedido/EstadoPedidos";
import RepartidorasPedidos from "./RepartidorasPedidos";
import { getPedidos } from "../service/PedidoService";

const ResumenPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    getPedidos("order")
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Error al obtener los pedidos:", error));
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 1200, margin: "20px auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Estadisticas
          </Typography>
          <EstadisticasPedidos pedidos={pedidos} />
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 1200, margin: "20px auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Resumen de Órdenes
          </Typography>
          <EstadoPedidos pedidos={pedidos} />
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 1200, margin: "20px auto", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Resumen de Órdenes
          </Typography>
          <RepartidorasPedidos pedidos={pedidos} />
        </CardContent>
      </Card>
    </>
  );
};

export default ResumenPedidos;
