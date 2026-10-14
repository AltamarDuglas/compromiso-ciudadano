// =============================================================================
// PUNTO DE ENTRADA PRINCIPAL: main.jsx
// =============================================================================
// Inicializa y monta la aplicación React en el DOM con React 18 createRoot.
// Carga la hoja de estilos global con diseño Mobile-First y Vanilla CSS puro.
// =============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/app.css';

// Montaje seguro en el contenedor #root
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento contenedor '#root' en el DOM.");
}
