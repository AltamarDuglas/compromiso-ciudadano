// =============================================================================
// COMPONENTE: MobileHeader.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Renderiza el encabezado oficial institucional homologado con
// https://larondavive-front.vercel.app/ y la Alcaldía de Montería.
// Cero emojis; gráficos vectoriales SVG nítidos y elegantes.
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Sparkles } from 'lucide-react';

export function MobileHeader() {
  return (
    <>
      {/* Cinta gráfica tricolor superior (Bandera de Montería: Rojo, Blanco, Azul) */}
      <div className="civic-ribbon-top" />

      {/* Encabezado fijo con desenfoque de fondo (Glassmorphism oficial) */}
      <header className="mobile-header">
        {/* Marca Oficial de la Alcaldía de Montería */}
        <div className="alcaldia-official-brand">
          {/* Escudo vectorial institucional */}
          <motion.div 
            className="alcaldia-escudo-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Alcaldía de Montería"
          >
            <Shield size={20} className="text-monteria-blue" />
          </motion.div>

          {/* Bloque tipográfico con la barra tricolor oficial */}
          <div className="alcaldia-text-wrapper">
            <div className="alcaldia-text-line">
              Alcaldía de <strong>MONTERÍA</strong>
            </div>
            {/* Barra oficial: Línea roja, estrella dorada, línea azul */}
            <div className="alcaldia-tricolor-bar">
              <span className="alcaldia-bar-red" />
              <Star size={10} className="alcaldia-bar-star-icon" fill="currentColor" />
              <span className="alcaldia-bar-blue" />
            </div>
          </div>
        </div>

        {/* Lema de campaña con tipografía limpia y sin emojis */}
        <motion.div 
          className="brand-slogan-pill"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Sparkles size={14} className="slogan-sparkle-icon" />
          <span>Vivamos bonito</span>
        </motion.div>
      </header>
    </>
  );
}
