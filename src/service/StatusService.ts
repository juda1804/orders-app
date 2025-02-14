import axios from "axios";
import { EstadoConfig, Metadata } from "../types";

const BASE_URL = "http://localhost:8080";

const getHeaders = () => {
  const userContext = localStorage.getItem('userContext');
  return {
    headers: {
      'Content-Type': 'application/json',
      'context': userContext || ''
    }
  };
};

export const getStatus = async (): Promise<EstadoConfig[]> => {
  const response = await axios.get<Metadata>(`${BASE_URL}/status`, getHeaders());
  return JSON.parse(response.data.rawMessage) as EstadoConfig[];
};

export const saveStatus = async (status: EstadoConfig[]): Promise<void> => {
  await axios.post<Metadata>(`${BASE_URL}/status`, status, getHeaders());
};