import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TablaPedidos from './components/TablaPedidos';
// Se eliminó la importación de DetallePedido
import Header from './components/Header';
import ResumenPedidos from './components/ResumenPedidos';
import FileUploadComponent from './components/carga-ordenes/FileUploadComponent';
import Login from './components/security/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const userContext = localStorage.getItem('userContext');
    if (userContext) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userContext');
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={logout} />}
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLogin={login} />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <ResumenPedidos />
          </ProtectedRoute>
        } />
        {/* Se eliminó la ruta de /detalles */}
        <Route path="/pedidos" element={
          <ProtectedRoute>
            <TablaPedidos />
          </ProtectedRoute>
        } />
        <Route path="/carga-orden" element={
          <ProtectedRoute>
            <FileUploadComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;