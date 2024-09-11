import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TablaPedidos from './components/TablaPedidos';
import DetallePedido from './components/DetallePedido';
import Header from './components/Header';
import ResumenPedidos from './components/ResumenPedidos';
import FileUploadComponent from './components/carga-ordenes/FileUploadComponent';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ResumenPedidos />} />
        <Route path="/detalles" element={<DetallePedido />} />
        <Route path="/pedidos" element={<TablaPedidos />} />
        <Route path="/carga-orden" element={<FileUploadComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;