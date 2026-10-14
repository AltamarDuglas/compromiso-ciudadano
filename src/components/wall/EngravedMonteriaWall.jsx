// =============================================================================
// COMPONENTE: EngravedMonteriaWall.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Renderiza el Muro Monumental donde las firmas quedan grabadas directamente
// en la pared como un tallado en piedra.
// Regla: No muestra el nombre de la persona; es ÚNICAMENTE la firma en PNG transparente.
// Las firmas se organizan espacialmente de forma aleatoria controlada sin superponerse,
// y el plano se aleja suavemente conforme aumentan los compromisos.
// Sin emojis; controles con lucide-react.
// =============================================================================

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Layers } from 'lucide-react';
import { WallLayoutService } from '../../domain/services/WallLayoutService.js';
import { SignatureSvgHelper } from '../../domain/services/SignatureSvgHelper.js';

export function EngravedMonteriaWall({ pledges = [], lastStampedPledgeId = null }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(480);
  const [userZoomLevel, setUserZoomLevel] = useState(1);

  // Escucha del ancho del viewport
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Cálculo de empaquetado sin superposiciones y factor de zoom
  const { placedPledges, wallBounds, autoZoomScale } = useMemo(() => {
    return WallLayoutService.layoutPledges(pledges, containerWidth);
  }, [pledges, containerWidth]);

  // Escala compuesta (alejamiento automático + controles manuales)
  const currentScale = autoZoomScale * userZoomLevel;

  const handleZoomIn = () => setUserZoomLevel(prev => Math.min(2.4, prev + 0.2));
  const handleZoomOut = () => setUserZoomLevel(prev => Math.max(0.35, prev - 0.2));
  const handleResetZoom = () => setUserZoomLevel(1);

  return (
    <section className="engraved-wall-section" ref={containerRef}>
      {/* Encabezado del Muro Monumental */}
      <div className="wall-header-strip">
        <div className="wall-title-box">
          <div className="wall-badge-stone">
            <Layers size={14} />
            <span>Muro Monumental de Montería</span>
          </div>
          <h2 className="wall-engraved-heading">
            Firmas Grabadas en la Pared
          </h2>
          <p className="wall-engraved-subtext">
            Muro colectivo donde cada firma queda estampada en bajo relieve. 
            A mayor número de firmas, más se aleja el plano panorámico.
          </p>
        </div>

        {/* Barra de Controles de Cámara y Zoom */}
        <div className="wall-camera-controls">
          <button 
            type="button" 
            className="wall-ctrl-btn" 
            onClick={handleZoomIn}
            title="Acercar plano"
            aria-label="Acercar plano"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            type="button" 
            className="wall-ctrl-btn" 
            onClick={handleZoomOut}
            title="Alejar plano"
            aria-label="Alejar plano"
          >
            <ZoomOut size={16} />
          </button>
          <button 
            type="button" 
            className="wall-ctrl-btn" 
            onClick={handleResetZoom}
            title="Restablecer plano"
            aria-label="Restablecer plano"
          >
            <RotateCcw size={16} />
          </button>
          <div className="wall-counter-chip">
            <span>{pledges.length} Firmas Talladas</span>
          </div>
        </div>
      </div>

      {/* Visor Panorámico con Textura de Pared de Cantera */}
      <div 
        className="engraved-wall-viewport"
        style={{
          minHeight: `${Math.max(340, Math.min(500, (wallBounds.height * currentScale) + 60))}px`
        }}
      >
        <div className="wall-stone-texture-overlay" />

        {/* Superficie del Muro con Zoom Cinemático */}
        <motion.div
          className="engraved-wall-surface"
          animate={{ scale: currentScale }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            width: `${wallBounds.width}px`,
            height: `${wallBounds.height}px`,
            transformOrigin: "top center",
            margin: "0 auto"
          }}
        >
          {placedPledges.map((item) => {
            const isJustStamped = item.id === lastStampedPledgeId;
            const fallbackPath = SignatureSvgHelper.getSvgPathForName(item.id);

            return (
              <motion.div
                key={item.id}
                className={`engraved-signature-tile ${isJustStamped ? 'is-freshly-stamped' : ''}`}
                style={{
                  left: `${item.layout.x}px`,
                  top: `${item.layout.y}px`,
                  width: `${item.layout.width}px`,
                  height: `${item.layout.height}px`,
                  transform: `rotate(${item.layout.rotation}deg)`
                }}
                initial={isJustStamped ? { scale: 2.5, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                title="Firma grabada en el Muro de Montería"
              >
                {/* Resplandor de impacto en caso de ser la firma recién estampada */}
                {isJustStamped && <div className="stamp-impact-flare" />}

                {/* Únicamente el trazo de la firma en PNG transparente */}
                <div className="carved-signature-graphic">
                  {item.signatureDataUrl ? (
                    <img 
                      src={item.signatureDataUrl} 
                      alt="Firma grabada en la pared" 
                      className="carved-sig-img"
                    />
                  ) : (
                    <svg viewBox="0 0 200 60" className="carved-sig-svg">
                      <path 
                        d={fallbackPath} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3.2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="wall-footer-hint">
        <span>Usa la lupa para explorar las firmas grabadas en relieve sobre la pared de Montería.</span>
      </div>
    </section>
  );
}
