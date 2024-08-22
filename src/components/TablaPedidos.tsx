import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Pedido } from "../types";
import { formatearCOP, formatearCOPStr } from "../utils/currency";
import { useLocation, useNavigate } from "react-router-dom";
import { formatearFechaHora } from "../utils/custom-date";
import { ContentCopy } from "@mui/icons-material";
import PedidoDialog from "./PedidosDialog";
import StatusChip from "./estados-pedido/StatusChip";
import { getPedidos } from "../service/PedidoService";

const TablaPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Obtener los parámetros de consulta de la URL
  const queryParams = new URLSearchParams(location.search);
  const estados = queryParams.getAll("status");
  const admin = queryParams.get("admin");

  useEffect(() => {
    getData();
  }, [location.search]);

  const getData = () => {
    // Construir la URL con los parámetros de consulta
    const baseUrl = "order"; // Reemplaza con la URL correcta
    const url =
      estados.length > 0
        ? `${baseUrl}?${estados.map((status) => `status=${status}`).join("&")}`
        : baseUrl;

    getPedidos(url)
      .then((response) => setPedidos(response))
      .catch((error) => console.error("Error al obtener los pedidos:", error));
  };

  const handleVerTodosClick = () => {
    // Remove the 'status' query parameter
    queryParams.delete("status");
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  const handleCopyClick = (guia: string, event: React.MouseEvent) => {
    event.stopPropagation()
    navigator.clipboard.writeText(guia).then(
      () => {
        console.log(`Copied: ${guia}`);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const handleRowClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPedido(null);
    window.location.reload();
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2} mt={2}>
        <Button
          variant="contained"
          onClick={handleVerTodosClick}
          sx={{
            backgroundColor: "#1976d2", // Blue background
            borderRadius: "50px", // Circular border
            color: "#fff", // White text
            paddingX: "20px", // Horizontal padding
          }}>
          Ver Todos
        </Button>
      </Box>

      <Box mx={5} my={5}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Guia</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Repartidora</TableCell>
                <TableCell>Cliente</TableCell>

                <TableCell>Celular</TableCell>
                {admin && (
                  <>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Costo Flete</TableCell>
                    <TableCell>Ganancia</TableCell>
                  </>
                )}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido, index) => (
                <TableRow
                  key={pedido.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(pedido)}>
                  <TableCell width={"150rem"}>
                    {formatearFechaHora(pedido.fechaOrden, pedido.hora)}
                  </TableCell>
                  <TableCell width={"170rem"}>
                    {pedido.guia}
                    {pedido.guia && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleCopyClick(pedido.guia, e)}
                        aria-label="copy"
                        sx={{ marginLeft: 1 }}>
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusChip status={pedido.status} />
                  </TableCell>
                  <TableCell>{pedido.repartidora}</TableCell>
                  <TableCell>{pedido.nombreCliente}</TableCell>
                  <TableCell>{pedido.celular}</TableCell>
                  {admin && (
                    <>
                      <TableCell>
                        {formatearCOPStr(pedido.valorTotal)}
                      </TableCell>
                      <TableCell>
                        {formatearCOPStr(pedido.costoFlete)}
                      </TableCell>
                      <TableCell>
                        {formatearCOP(
                          Number(pedido.valorTotal) - Number(pedido.costoFlete)
                        )}
                      </TableCell>
                    </>
                  )}
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedPedido && (
        <PedidoDialog
          open={openModal}
          onClose={handleCloseModal}
          pedido={selectedPedido}
        />
      )}
    </>
  );
};

export default TablaPedidos;
