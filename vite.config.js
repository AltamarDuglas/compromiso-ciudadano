// =============================================================================
// Configuración de Vite para la Aplicación: "TODOS Somos Montería - ¡Vivamos Bonito!"
// =============================================================================
// Se utiliza Vite como empaquetador ultrarrápido y servidor de desarrollo.
// Integra el plugin oficial de React para soporte de JSX y Fast Refresh (HMR).

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugins activos para el procesamiento del proyecto
  plugins: [
    // Habilita el soporte completo de React con transformaciones automáticas de JSX
    react()
  ],
  // Configuración del servidor de desarrollo local
  server: {
    port: 3000,
    open: false,
    host: true // Permite pruebas en red local desde dispositivos móviles reales
  },
  // Opciones de construcción para producción
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
