import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface BuscarGuiaDialogProps {
  open: boolean;
  onClose: () => void;
  guia: string;
}

const BuscarGuiaDialog: React.FC<BuscarGuiaDialogProps> = ({ open, onClose, guia }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Información de la guía: {guia}</DialogTitle>
      <DialogContent>
        {/* Aquí puedes agregar la lógica para buscar y mostrar la información de la guía */}
        <p>Información de la guía {guia}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuscarGuiaDialog;