// =============================================================================
// COMPONENTE: HeroBanner.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Presenta el propósito cívico del programa con un único <h1> semántico (SEO)
// y el botón llamativo principal: "Hacer mi pacto con Montería".
// Cero emojis; utiliza íconos vectoriales limpios de lucide-react.
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroBanner({ onOpenSignatureStudio }) {
  return (
    <section className="hero-section">
      {/* Etiqueta institucional sobria sin emojis */}
      <motion.div 
        className="hero-pill-tag"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShieldCheck size={14} className="text-monteria-blue" />
        <span>Movimiento Ciudadano Oficial</span>
      </motion.div>

      {/* Título semántico principal H1 optimizado para SEO */}
      <motion.h1 
        className="hero-main-title"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Por una Montería <span className="highlight-red">Limpia</span> y <span className="highlight-gold">Viva</span>
      </motion.h1>

      {/* Mensaje inspirador de cultura ciudadana */}
      <motion.p 
        className="hero-lead-text"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        El Río Sinú nos une y nuestra ciudad nos llena de orgullo. Firma tu compromiso, 
        graba tu nombre en el Muro Monumental y sé un <strong>Guardián de Montería</strong>.
      </motion.p>

      {/* Botón Llamativo Principal: "Hacer mi pacto con Montería" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ width: '100%', maxWidth: '440px', margin: '0.4rem auto 0.8rem' }}
      >
        <motion.button
          type="button"
          className="btn-hero-pact-callout"
          onClick={onOpenSignatureStudio}
          whileTap={{ scale: 0.97 }}
        >
          <PenTool size={20} />
          <span>Hacer mi pacto con Montería</span>
          <Sparkles size={18} className="btn-sparkle-accent" />
        </motion.button>
      </motion.div>
    </section>
  );
}
