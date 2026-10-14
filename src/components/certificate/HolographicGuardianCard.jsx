// =============================================================================
// COMPONENTE: HolographicGuardianCard.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Renderiza la credencial holográfica oficial de Guardián de Montería con
// simulación de inclinación 3D táctil e iluminación metálica brillante.
// Cero emojis; gráficos vectoriales SVG con Award de lucide-react.
// =============================================================================

import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { useHolographicTilt } from '../../hooks/useHolographicTilt.js';

export function HolographicGuardianCard({
  citizenName = "Ciudadano Ejemplar",
  location = "Montería",
  folio = "#MON-2026-0001",
  dateFormatted = "14 de Octubre de 2026",
  signatureDataUrl = ""
}) {
  const { tilt, handleMove, handleLeave } = useHolographicTilt();

  return (
    <div
      className="holographic-card-3d"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchEnd={handleLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
      }}
    >
      {/* Capa de reflejo holográfico dinámico */}
      <div
        className="holographic-sheen-layer"
        style={{
          transform: `translate(${tilt.glareX - 50}%, ${tilt.glareY - 50}%)`
        }}
      />

      {/* Fila superior con logotipo y medalla vectorial */}
      <div className="card-top-row">
        <div className="card-campaign-logo">
          TODOS <span>Somos Montería</span>
        </div>
        <div className="card-gold-seal-box">
          <Award size={24} className="card-gold-seal-svg" />
        </div>
      </div>

      {/* Título de honor cívico */}
      <div className="card-honor-title">Credencial Oficial de Ciudadano</div>
      <div className="card-citizen-name">{citizenName}</div>
      <div className="card-motto">Vivamos bonito</div>

      {/* Vista previa de la firma digitalizada */}
      <div className="card-sig-preview">
        {signatureDataUrl ? (
          <img src={signatureDataUrl} alt="Firma del Guardián" />
        ) : (
          <span style={{ fontSize: '0.85rem', color: 'var(--star-yellow)', fontStyle: 'italic' }}>
            Firma Digital Registrada
          </span>
        )}
      </div>

      {/* Metadatos oficiales de folio, ubicación y expedición */}
      <div className="card-meta-grid">
        <div>
          <span>Ubicación:</span>
          <br />
          <strong>{location}</strong>
        </div>
        <div>
          <span>Fecha:</span>
          <br />
          <strong>{dateFormatted}</strong>
        </div>
        <div>
          <span>Folio Cívico:</span>
          <br />
          <strong>{folio}</strong>
        </div>
        <div>
          <span>Rango:</span>
          <br />
          <strong style={{ color: 'var(--star-yellow)' }}>Guardián del Sinú</strong>
        </div>
      </div>
    </div>
  );
}
