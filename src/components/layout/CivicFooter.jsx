// =============================================================================
// COMPONENTE: CivicFooter.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Pie de página institucional y cívico con ondas del Río Sinú,
// créditos a la cultura ciudadana y mensaje inspirador de "Vivamos Bonito".
// =============================================================================

import React from 'react';

export function CivicFooter() {
  return (
    <footer className="civic-footer">
      {/* Onda gráfica fluida en tonos del Río Sinú */}
      <div className="footer-sinu-wave" />

      <p className="footer-highlight">
        TODOS Somos Montería • ¡Vivamos bonito!
      </p>
      <p style={{ marginTop: '0.4rem', opacity: 0.85 }}>
        Iniciativa Cívica y Ambiental por la Perla del Sinú. Cuidar nuestra ciudad es compromiso de todos.
      </p>
      <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', opacity: 0.6 }}>
        Montería, Córdoba — Colombia • 2026
      </p>
    </footer>
  );
}
