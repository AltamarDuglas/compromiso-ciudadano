// =============================================================================
// COMPONENTE: EnergyCounterBar.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Muestra métricas vivas de impacto de la campaña con números destacados
// que motivan al usuario a sumarse al compromiso colectivo.
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';

export function EnergyCounterBar({ totalSignatures = 1482, totalActions = 4446 }) {
  return (
    <div className="stats-strip">
      {/* Tarjeta 1: Total de Firmas Ciudadanas */}
      <motion.div 
        className="stat-chip"
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="stat-val red">
          {totalSignatures.toLocaleString()}
        </div>
        <div className="stat-tag">Firmas Activas</div>
      </motion.div>

      {/* Tarjeta 2: Acciones Comprometidas por la Ciudad */}
      <motion.div 
        className="stat-chip"
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="stat-val gold">
          {totalActions.toLocaleString()}
        </div>
        <div className="stat-tag">Acciones Cívicas</div>
      </motion.div>

      {/* Tarjeta 3: Pasión y Orgullo por el Río Sinú */}
      <motion.div 
        className="stat-chip"
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="stat-val green">100%</div>
        <div className="stat-tag">Orgullo Sinú</div>
      </motion.div>
    </div>
  );
}
