// =============================================================================
// COMPONENTE: PledgeWizard.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Formulario de compromiso táctil con selección de barrio, compromisos y firma.
// Sin uso de emojis; íconos vectoriales SVG limpios.
// =============================================================================

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Check, 
  PenTool, 
  RotateCcw, 
  AlertCircle,
  Droplets,
  Clock,
  Recycle,
  ShieldAlert,
  Award
} from 'lucide-react';
import { OFFICIAL_COMMITMENTS, MONTERIA_SECTORS } from '../../domain/models/CommitmentOption.js';
import { PledgeValidationService } from '../../domain/services/PledgeValidationService.js';
import { Signer } from '../../domain/models/Signer.js';
import { Pledge } from '../../domain/models/Pledge.js';
import { useSignatureCanvas } from '../../hooks/useSignatureCanvas.js';

// Mapeo seguro de íconos vectoriales
const ICONS_MAP = {
  Droplets,
  Clock,
  Recycle,
  ShieldAlert,
  Award
};

export function PledgeWizard({ onPledgeSuccess }) {
  const [fullName, setFullName] = useState('');
  const [sector, setSector] = useState('La Granja');
  const [customSector, setCustomSector] = useState('');
  const [selectedCommitments, setSelectedCommitments] = useState(() => 
    OFFICIAL_COMMITMENTS.filter(c => c.defaultSelected).map(c => c.id)
  );
  const [errorMessage, setErrorMessage] = useState('');

  const {
    canvasRef,
    hasSigned,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getSignatureDataUrl
  } = useSignatureCanvas();

  const energyPercent = useMemo(() => {
    return PledgeValidationService.calculateEnergyLevel(
      selectedCommitments.length,
      OFFICIAL_COMMITMENTS.length
    );
  }, [selectedCommitments.length]);

  const toggleCommitment = (id) => {
    setSelectedCommitments(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSector = customSector.trim() || sector;

    const validation = PledgeValidationService.validate({
      fullName,
      sector: finalSector,
      commitments: selectedCommitments,
      hasSigned
    });

    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    setErrorMessage('');
    const signer = new Signer(fullName, finalSector);
    const signatureDataUrl = getSignatureDataUrl();

    const newPledge = new Pledge({
      signer,
      commitments: selectedCommitments,
      signatureDataUrl,
      createdAt: new Date()
    });

    onPledgeSuccess(newPledge);
    clearCanvas();
  };

  return (
    <section className="wizard-card" id="formulario-pacto">
      <div className="energy-meter-box">
        <div className="energy-meter-header">
          <div className="energy-meter-title">
            <Zap size={15} className="text-monteria-blue" />
            <span>Nivel de Compromiso Cívico:</span>
          </div>
          <div className="energy-meter-percent">{energyPercent}%</div>
        </div>
        <div className="energy-track">
          <div 
            className="energy-fill"
            style={{ width: `${energyPercent}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field-group">
          <label className="form-label" htmlFor="citizen-name">
            Nombre y Apellidos <span className="req">*</span>
          </label>
          <input
            id="citizen-name"
            type="text"
            className="input-text-touch"
            placeholder="Ej. Juan Camilo Paternina"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrorMessage('');
            }}
            required
          />
        </div>

        <div className="form-field-group">
          <label className="form-label">
            Barrio o sector en Montería <span className="req">*</span>
          </label>
          
          <div className="location-quick-chips">
            {MONTERIA_SECTORS.map((sec) => (
              <button
                type="button"
                key={sec}
                className={`chip-btn ${sector === sec && !customSector ? 'active' : ''}`}
                onClick={() => {
                  setSector(sec);
                  setCustomSector('');
                  setErrorMessage('');
                }}
              >
                {sec}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="input-text-touch"
            placeholder="O escribe otro barrio/corregimiento..."
            value={customSector}
            onChange={(e) => {
              setCustomSector(e.target.value);
              setErrorMessage('');
            }}
          />
        </div>

        <div className="form-field-group">
          <label className="form-label">
            Mis compromisos cívicos:
          </label>
          <div className="pledge-list">
            {OFFICIAL_COMMITMENTS.map((item) => {
              const isSelected = selectedCommitments.includes(item.id);
              const IconComp = ICONS_MAP[item.iconName] || Award;
              return (
                <motion.div
                  key={item.id}
                  className={`pledge-item-touch ${isSelected ? 'active' : ''}`}
                  onClick={() => toggleCommitment(item.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="pledge-check-box">
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                  <div className="pledge-text-block">
                    <div className="pledge-text-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <IconComp size={16} className="text-monteria-blue" />
                      <span>{item.title}</span>
                    </div>
                    <div className="pledge-text-desc">{item.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="form-field-group">
          <label className="form-label">
            Traza tu firma en la pantalla <span className="req">*</span>
          </label>
          <div className="signature-box-container">
            {!hasSigned && (
              <div className="signature-guide-hint">
                Dibuja tu firma aquí con tu dedo o mouse
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="signature-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div className="signature-footer-actions">
              <span className="signature-watermark">Montería Limpia</span>
              <button
                type="button"
                className="btn-clear-sig"
                onClick={clearCanvas}
              >
                <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Limpiar trazo
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: '#dc2626',
              fontSize: '0.84rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="btn-seal-pledge"
          whileTap={{ scale: 0.96 }}
        >
          <PenTool size={18} />
          <span>Sellar mi Pacto por Montería</span>
        </motion.button>
      </form>
    </section>
  );
}
