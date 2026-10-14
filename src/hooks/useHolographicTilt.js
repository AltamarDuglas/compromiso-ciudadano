// =============================================================================
// CUSTOM HOOK: useHolographicTilt.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Provee una experiencia sensorial hipnótica calculando el ángulo de inclinación 3D
// y la traslación de la capa reflectiva holográfica de la credencial oficial.
// Funciona tanto con eventos táctiles en móviles como con ratón en escritorio.
// =============================================================================

import { useState, useCallback } from 'react';

export function useHolographicTilt() {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50
  });

  /**
   * Procesa el movimiento del dedo o mouse sobre la credencial.
   */
  const handleMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rango de rotación suave entre -12 y +12 grados
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY
    });
  }, []);

  /**
   * Restablece la orientación cuando el dedo o cursor se retira.
   */
  const handleLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50
    });
  }, []);

  return {
    tilt,
    handleMove,
    handleLeave
  };
}
