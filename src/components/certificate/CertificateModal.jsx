// =============================================================================
// COMPONENTE: CertificateModal.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Orquesta la consagración cívica tras firmar y estampar el pacto en el muro:
// - Despliegue de confeti en los colores oficiales de Montería
// - Presentación de la Credencial Holográfica 3D
// - Descarga del diploma oficial en HD PNG
// - Compartir por WhatsApp o menú nativo del dispositivo
// - Cero emojis; íconos vectoriales SVG limpios de lucide-react
// =============================================================================

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Share2, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HolographicGuardianCard } from './HolographicGuardianCard.jsx';
import { CertificateGeneratorService } from '../../domain/services/CertificateGeneratorService.js';
import { WebShareAdapter } from '../../infrastructure/sharing/WebShareAdapter.js';

export function CertificateModal({ isOpen, onClose, pledge }) {
  // Disparo de confeti festivo al sellar y abrirse la consagración
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#f59e0b', '#2563eb', '#ffffff']
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#dc2626', '#f59e0b', '#2563eb']
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2563eb', '#f59e0b', '#ffffff']
        });
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !pledge) return null;

  const citizenName = pledge.signer?.fullName || "Ciudadano Ejemplar";
  const location = pledge.signer?.getFormattedLocation() || "Montería";
  const folio = pledge.folio;
  const dateFormatted = pledge.getFormattedDate();
  const signatureDataUrl = pledge.signatureDataUrl;

  /**
   * Descarga del diploma en PNG de alta resolución.
   */
  const handleDownload = async () => {
    await CertificateGeneratorService.downloadDiplomaPng({
      citizenName,
      location,
      folio,
      dateFormatted,
      signatureDataUrl
    });
  };

  /**
   * Compartir en WhatsApp o menú nativo.
   */
  const handleShare = async () => {
    await WebShareAdapter.sharePledge({
      citizenName,
      sector: location,
      folio
    });
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay-blur" onClick={onClose}>
        <motion.div
          className="modal-dialog-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          {/* Botón para cerrar */}
          <button className="modal-close-touch" onClick={onClose} aria-label="Cerrar modal">
            <X size={18} />
          </button>

          {/* Encabezado sin emojis */}
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div className="modal-award-icon-box">
              <Award size={36} className="text-monteria-blue" />
            </div>
            <h2 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.45rem', 
              color: 'var(--text-main)',
              marginTop: '0.2rem'
            }}>
              Pacto Sellado con Éxito
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Tu firma ha quedado grabada en el Muro Monumental. Ya eres <strong>Guardián Oficial</strong>.
            </p>
          </div>

          {/* Tarjeta Holográfica 3D */}
          <HolographicGuardianCard
            citizenName={citizenName}
            location={location}
            folio={folio}
            dateFormatted={dateFormatted}
            signatureDataUrl={signatureDataUrl}
          />

          {/* Botones de acción táctiles para móviles */}
          <div className="cert-action-buttons">
            <motion.button 
              className="btn-whatsapp-share" 
              onClick={handleShare}
              whileTap={{ scale: 0.97 }}
            >
              <Share2 size={18} />
              <span>Compartir en WhatsApp</span>
            </motion.button>

            <motion.button 
              className="btn-download-png" 
              onClick={handleDownload}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={18} />
              <span>Descargar Diploma en HD</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
