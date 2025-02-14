import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EstadoConfig, Pedido } from "../types";
import EstadisticasPedidos from "./EstadisticasPedidos";
import EstadoPedidos from "./estados-pedido/EstadoPedidos";
import RepartidorasPedidos from "./RepartidorasPedidos";
import { getPedidos } from "../service/PedidoService";
import { getStatus } from "../service/StatusService";

const ResumenPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [estadosConfig, setEstadosConfig] = useState<EstadoConfig[]>([]);

  useEffect(() => {
    
    getPedidos("order")
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Error al obtener los pedidos:", error));

    getStatus()
      .then((data) => setEstadosConfig(data))
      .catch((error) => console.error("Error al obtener los estados:", error));
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
          <EstadoPedidos pedidos={pedidos} estadosConfig={estadosConfig} />
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
