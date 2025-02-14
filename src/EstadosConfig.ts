import { EstadoConfig } from "./types";

export const EstadosConfig: EstadoConfig[] = [
    {
      nombre: "Pendiente",
      alias: ["PENDIENTE"],
      colorFondo: "#FFEB3B",
      posicion: 7,
      font: "#000000",
    },
    {
      nombre: "En reparto",
      alias: ["EN RUTA", "CAMINO", "EN REPARTO", "INTENTO DE ENTREGA", "En proceso de entrega"],
      colorFondo: "#F44336",
      posicion: 2,
    },
    {
      nombre: "Pendiete Reclamar oficina",
      alias: ["RECLAME EN OFICINA"],
      colorFondo: "#F44336",
      posicion: 2,
    },
  
    {
      nombre: "En Procesamiento",
      alias: ["EN PROCESAMIENTO", "Generada"],
      colorFondo: "#03A9F4",
      posicion: 3,
    },

    {
      nombre: "Novedades",
      alias: ["NOVEDAD", "Novedad"],
      colorFondo: "#03A9F4",
      posicion: 3,
    },
  
    { nombre: "OTROS", alias: [], colorFondo: "#808080", posicion: 5 },
    { nombre: "Devoluciones", alias: ["DEVOLUCION"], colorFondo: "#808080", posicion: 5 },
    {
      nombre: "Entregado",
      alias: ["ENTREGADO", "Entregada a destino"],
      colorFondo: "#4CAF50",
      posicion: 6,
    },
    {
      nombre: "Cancelado",
      alias: ["CANCELADO"],
      colorFondo: "#F44336",
      posicion: 8,
    },
];