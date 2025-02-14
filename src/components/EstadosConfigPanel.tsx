import React, { useState, useEffect } from 'react';
import { EstadoConfig } from '../types';
import { Box, Button, Card, TextField, Chip, IconButton, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { HexColorPicker } from 'react-colorful';
import { getStatus } from '../service/StatusService';

export const EstadosConfigPanel: React.FC = () => {
  const [estados, setEstados] = useState<EstadoConfig[]>([]);
  const [newAlias, setNewAlias] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadEstadosConfig();
  }, []);

  const loadEstadosConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStatus();
      setEstados(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
      console.error('Error loading estados config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveEstadosConfig = async () => {
    try {
      setSaveStatus('saving');
      const response = await fetch('/api/estados-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estados),
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar la configuración');
      }
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Error saving estados config:', error);
    }
  };

  const handleAddAlias = (estadoIndex: number) => {
    if (!newAlias.trim()) return;
    
    const updatedEstados = [...estados];
    updatedEstados[estadoIndex].alias.push(newAlias.trim());
    setEstados(updatedEstados);
    setNewAlias('');
  };

  const handleRemoveAlias = (estadoIndex: number, aliasIndex: number) => {
    const updatedEstados = [...estados];
    updatedEstados[estadoIndex].alias.splice(aliasIndex, 1);
    setEstados(updatedEstados);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <h2>Configuración de Estados</h2>
      {estados.map((estado, estadoIndex) => (
        <Card key={estadoIndex} sx={{ p: 2, mb: 2 }}>
          <h3>{estado.nombre}</h3>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Color de fondo"
              value={estado.colorFondo}
              onClick={() => setSelectedEstado(estadoIndex)}
              onBlur={(e) => {
                if (!e.relatedTarget?.closest('.color-picker-container')) {
                  setSelectedEstado(null);
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 1,
                      bgcolor: estado.colorFondo,
                      mr: 1,
                      border: '1px solid #ccc'
                    }}
                  />
                ),
              }}
            />
            {selectedEstado === estadoIndex && (
              <Box 
                className="color-picker-container"
                sx={{ 
                  position: 'absolute', 
                  zIndex: 2,
                  mt: 1,
                  boxShadow: 3,
                  bgcolor: 'background.paper',
                  p: 1,
                  borderRadius: 1
                }}
                tabIndex={0}
              >
                <HexColorPicker
                  color={estado.colorFondo}
                  onChange={(color: string) => {
                    const updatedEstados = [...estados];
                    updatedEstados[estadoIndex].colorFondo = color;
                    setEstados(updatedEstados);
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Nuevo alias"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              size="small"
            />
            <IconButton onClick={() => handleAddAlias(estadoIndex)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {estado.alias.map((alias, aliasIndex) => (
              <Chip
                key={aliasIndex}
                label={alias}
                onDelete={() => handleRemoveAlias(estadoIndex, aliasIndex)}
              />
            ))}
          </Box>
        </Card>
      ))}
      
      <Button
        variant="contained"
        color="primary"
        onClick={saveEstadosConfig}
        disabled={saveStatus === 'saving'}
        sx={{ mt: 2 }}
      >
        {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Cambios'}
      </Button>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Configuración guardada exitosamente
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error al guardar la configuración
        </Alert>
      )}
    </Box>
  );
}; 