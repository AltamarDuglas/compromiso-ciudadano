// =============================================================================
// COMPONENTE: FullscreenSignatureStudio.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Provee el estudio horizontal en pantalla completa donde el ciudadano dibuja su firma.
// Regla: No se requiere nombre obligatorio en la firma. Es la mera firma en PNG transparente.
// Al pulsar "Firmar", la firma transparente se eleva y vuela hacia la pantalla para estamparse en el muro.
// Cero emojis; controles con lucide-react.
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, 
  RotateCcw, 
  X, 
  Check, 
  MapPin, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { MONTERIA_SECTORS } from '../../domain/models/CommitmentOption.js';
import { PledgeValidationService } from '../../domain/services/PledgeValidationService.js';
import { Signer } from '../../domain/models/Signer.js';
import { Pledge } from '../../domain/models/Pledge.js';
import { useSignatureCanvas } from '../../hooks/useSignatureCanvas.js';

export function FullscreenSignatureStudio({ isOpen, onClose, onPledgeSigned }) {
  const [sector, setSector] = useState('La Granja');
  const [errorMessage, setErrorMessage] = useState('');
  const [isStampingAnimation, setIsStampingAnimation] = useState(false);
  const [capturedSigUrl, setCapturedSigUrl] = useState('');

  // Hook del lienzo táctil fluido sincronizado con la visibilidad del modal
  const {
    canvasRef,
    hasSigned,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getSignatureDataUrl
  } = useSignatureCanvas(isOpen);

  /**
   * Ejecuta el proceso de firma y la animación cinemática hacia la pantalla
   */
  const handleExecuteSign = () => {
    // Validación: únicamente exige haber trazado la firma digital
    const validation = PledgeValidationService.validate({
      hasSigned
    });

    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    setErrorMessage('');
    const signatureUrl = getSignatureDataUrl();
    setCapturedSigUrl(signatureUrl);

    // Iniciar secuencia cinemática de la firma transparente volando hacia la pantalla
    setIsStampingAnimation(true);

    const signer = new Signer('Guardián de Montería', sector);
    const newPledge = new Pledge({
      signer,
      commitments: ["sinu_protection", "waste_schedule", "recycle_source"],
      signatureDataUrl: signatureUrl,
      createdAt: new Date()
    });

    // Tras el vuelo, estampar la firma transparente en el Muro
    setTimeout(() => {
      onPledgeSigned(newPledge);
      setIsStampingAnimation(false);
      clearCanvas();
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fullscreen-studio-backdrop">
        <motion.div 
          className="fullscreen-studio-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          {/* Barra Superior del Estudio */}
          <div className="studio-topbar">
            <div className="studio-brand-title">
              <span className="studio-badge-pulse" />
              <span>Estudio de Firma Horizontal</span>
              <span className="studio-sep">|</span>
              <span className="studio-city">Montería</span>
            </div>

            <button 
              type="button"
              className="studio-close-btn" 
              onClick={onClose}
              title="Cerrar estudio"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cuerpo del Estudio de Pantalla Completa enfocado en la Firma */}
          <div className="studio-horizontal-layout">
            {/* Barra rápida superior de selección de sector/barrio */}
            <div className="studio-sector-quickbar">
              <div className="studio-sector-label">
                <MapPin size={15} className="text-monteria-blue" />
                <span>Barrio o sector en Montería:</span>
              </div>
              <div className="studio-chips-scroll">
                {MONTERIA_SECTORS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    className={`studio-chip ${sector === sec ? 'is-active' : ''}`}
                    onClick={() => setSector(sec)}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Gran Lienzo Horizontal para la Firma */}
            <div className="studio-canvas-fullscreen-box">
              <div className="studio-canvas-toolbar">
                <div className="studio-canvas-hint-text">
                  <PenTool size={16} className="text-monteria-blue" />
                  <span>Dibuja tu firma con tu dedo o mouse a lo largo de la pantalla</span>
                </div>
                <button 
                  type="button" 
                  className="studio-clear-btn" 
                  onClick={clearCanvas}
                  title="Borrar y reintentar trazo"
                >
                  <RotateCcw size={14} />
                  <span>Borrar trazo</span>
                </button>
              </div>

              {/* Contenedor del Canvas de Firma */}
              <div className="studio-canvas-drawing-area">
                {!hasSigned && (
                  <div className="studio-canvas-watermark">
                    <span>Traza aquí tu firma</span>
                    <small>Se estampará en PNG transparente directamente sobre el Muro de Montería</small>
                  </div>
                )}
                <canvas 
                  ref={canvasRef}
                  className="studio-drawing-canvas-fluid"
                  onPointerDown={startDrawing}
                  onPointerMove={draw}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>

              {/* Alerta de Error */}
              {errorMessage && (
                <div className="studio-error-banner">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Barra de Acciones con el Botón "Firmar" */}
            <div className="studio-bottom-actions-strip">
              <button 
                type="button" 
                className="studio-cancel-btn" 
                onClick={onClose}
              >
                Cancelar
              </button>
              <motion.button 
                type="button"
                className="studio-btn-sign-prominent"
                onClick={handleExecuteSign}
                whileTap={{ scale: 0.98 }}
              >
                <PenTool size={20} />
                <span>Firmar</span>
                <Sparkles size={18} className="btn-sparkle-accent" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Animación: La mera firma en PNG transparente vuela hacia la pantalla */}
        {isStampingAnimation && (
          <div className="studio-flying-stamp-portal">
            <div className="studio-stamp-shockwave" />
            <motion.div 
              className="studio-flying-signature-transparent"
              initial={{ scale: 0.8, opacity: 0, z: -50 }}
              animate={{ 
                scale: [0.8, 2.4, 1],
                opacity: [0, 1, 1],
                z: [0, 250, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ duration: 0.95, times: [0, 0.65, 1], ease: "easeInOut" }}
            >
              {/* Únicamente la firma en PNG transparente */}
              <img src={capturedSigUrl} alt="Firma en vuelo hacia la pared" className="flying-pure-signature-img" />
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
