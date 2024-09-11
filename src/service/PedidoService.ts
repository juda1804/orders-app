// src/services/pedidoService.ts
import axios from "axios";
import { Pedido } from "../types";

const BASE_URL = "http://localhost:8080";

export const getPedidos = async (url: string): Promise<Pedido[]> => {
  try {
    const response = await axios.get<Pedido[]>(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pedidos:", error);
    throw new Error("Failed to fetch pedidos. Please try again later.");
  }
};

export const getPedido = async (guia: string): Promise<Pedido> => {
    try {
      const response = await axios.get<Pedido>(`${BASE_URL}/order/${guia}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pedidos:", error);
      throw new Error("Failed to fetch pedidos. Please try again later.");
    }
  };

export const updatePedido = async (pedido: Pedido): Promise<Pedido> => {
  try {
    const response = await axios.post<Pedido>(
      `${BASE_URL}/order/${pedido.id}`,
      pedido
    );
    return response.data;
  } catch (error) {
    console.error("Error updating pedido:", error);
    throw new Error("Failed to update pedido. Please try again later.");
  }
};

export const addObservacion = async (
  guia: string,
  observacion: string,
  onClose: () => void
) => {
  // Updated pedido data
  const updatedPedido = {
    observacion: observacion,
  };

  // Send the updated pedido to the backend
  axios
    .post(`${BASE_URL}/order/${guia}`, updatedPedido)
    .then((response) => {
      console.log("Pedido actualizado:", response.data);
      onClose(); // Close the modal after saving
    })
    .catch((error) => {
      console.error("Error al actualizar el pedido:", error);
    });
};
