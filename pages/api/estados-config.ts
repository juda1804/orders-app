import { NextApiRequest, NextApiResponse } from 'next';
import { getEstadosConfig, saveEstadosConfig } from '../../src/api/estados-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const config = await getEstadosConfig();
      return res.status(200).json(config);
    }

    if (req.method === 'POST') {
      const newConfig = req.body;
      await saveEstadosConfig(newConfig);
      return res.status(200).json({ message: 'Configuración guardada exitosamente' });
    }

    return res.status(405).json({ message: 'Método no permitido' });
  } catch (error) {
    console.error('Error en el endpoint estados-config:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
} 