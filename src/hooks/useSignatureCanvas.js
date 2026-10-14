// =============================================================================
// CUSTOM HOOK: useSignatureCanvas.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Encapsula la interacción táctil y física del canvas de firma digital:
// - Mapeo 1:1 exacto entre el puntero (mouse o touch) y el buffer del canvas.
// - Soporta pantallas de alta densidad (Retina / 4K / DPI móvil y de escritorio).
// - Sincronización automática de dimensiones al abrir el modal y en redimensionamiento.
// - Interpolación de curvas bezier fluidas y partículas luminosas.
// - Exportación a Base64 en formato PNG transparente puro.
// =============================================================================

import { useRef, useState, useEffect, useCallback } from 'react';

export function useSignatureCanvas(isOpen = true) {
  const canvasRef = useRef(null);
  const [hasSigned, setHasSigned] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  /**
   * Configura los estilos del pincel caligráfico sobre el contexto 2D.
   * Trazo dorado uniforme y parejo, sin sobrecarga de blur para máximo rendimiento y fluidez.
   * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas
   * @param {number} dpr - Factor de escala de píxeles del dispositivo
   */
  const setupStrokeStyles = useCallback((ctx, dpr = 1) => {
    if (!ctx) return;
    ctx.strokeStyle = '#fbbf24'; // Amarillo dorado oficial de la campaña
    ctx.fillStyle = '#fbbf24';
    ctx.lineWidth = 3.6 * dpr;    // Grosor parejo y continuo
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 0;          // Cero blur para evitar caídas de frames (pausas) en GPU integrada
    ctx.shadowColor = 'transparent';
  }, []);

  /**
   * Ajusta el tamaño real del bitmap del canvas (canvas.width / canvas.height)
   * al tamaño físico en píxeles que ocupa en pantalla según getBoundingClientRect() y devicePixelRatio.
   * Preserva el contenido ya dibujado si existe.
   */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    // Si ya tiene el tamaño exacto, solo verificar estilos del contexto
    if (canvas.width === targetWidth && canvas.height === targetHeight) {
      const ctx = canvas.getContext('2d');
      setupStrokeStyles(ctx, dpr);
      return;
    }

    // Si ya había trazo firmado, respaldar en un canvas temporal antes de redimensionar
    let tempCanvas = null;
    if (canvas.width > 0 && canvas.height > 0 && hasSigned) {
      tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);
    }

    // Asignar nuevas dimensiones físicas de bitmap
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    setupStrokeStyles(ctx, dpr);

    // Restaurar trazo escalado proporcionalmente si existía
    if (tempCanvas) {
      ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    }
  }, [hasSigned, setupStrokeStyles]);

  /**
   * Efecto reactivo al estado de apertura del modal (isOpen) y redimensionamiento.
   * Incluye temporizadores para aguardar a que Framer Motion complete transiciones de escala.
   */
  useEffect(() => {
    if (!isOpen) return;

    // Ejecución inmediata
    handleResize();

    // Re-comprobar tras transiciones de layout
    const timer1 = setTimeout(handleResize, 50);
    const timer2 = setTimeout(handleResize, 250);
    const timer3 = setTimeout(handleResize, 450);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Observador de mutación de dimensiones del contenedor
    let resizeObserver = null;
    if (canvasRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(canvasRef.current);
      if (canvasRef.current.parentElement) {
        resizeObserver.observe(canvasRef.current.parentElement);
      }
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isOpen, handleResize]);

  /**
   * Obtiene las coordenadas exactas mapeadas al espacio de píxeles del bitmap del canvas.
   * Garantiza de forma matemática que el trazo aparezca EXACTAMENTE debajo del puntero o dedo,
   * sin desfases por zoom de pantalla, display flex o escalamiento DPI.
   * 
   * @param {MouseEvent|TouchEvent|PointerEvent} e - Evento de ratón, toque o puntero
   * @returns {{x: number, y: number}} Coordenadas en píxeles del bitmap
   */
  const getCoordinates = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Factor de escala exacto entre el bitmap interno del canvas y el tamaño CSS renderizado
    const scaleX = rect.width > 0 ? (canvas.width / rect.width) : 1;
    const scaleY = rect.height > 0 ? (canvas.height / rect.height) : 1;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }, []);

  /**
   * Inicia el trazo de la firma al presionar el ratón, puntero o apoyar el dedo en pantalla.
   */
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Capturar puntero si es soportado para no perder el trazo al moverse rápido
    if (e.pointerId && e.currentTarget && e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Fallback silencioso si el navegador no permite captura
      }
    }

    // Asegurar que las dimensiones del canvas estén sincronizadas antes de pintar
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (rect.width > 0 && Math.abs(canvas.width - Math.round(rect.width * dpr)) > 3) {
      handleResize();
    }

    const coords = getCoordinates(e);
    isDrawingRef.current = true;
    lastPointRef.current = coords;

    const ctx = canvas.getContext('2d');
    setupStrokeStyles(ctx, dpr);

    // Dibujar punto de contacto inicial redondeado parejo (para registrar toques rápidos o puntos)
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, (3.6 * dpr) / 2, 0, Math.PI * 2);
    ctx.fill();

    setHasSigned(true);
  };

  /**
   * Dibuja de forma 100% continua, pareja y fluida entre puntos consecutivos.
   * Sin pausas, sin círculos artificiales y sin discontinuidades.
   */
  const draw = (e) => {
    if (!isDrawingRef.current) return;
    if (e.cancelable && e.type === 'touchmove') {
      e.preventDefault(); // Previene desplazamiento de página accidental al firmar
    }

    const coords = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prev = lastPointRef.current;
    const curr = coords;

    // Si la distancia es insignificante (< 0.5px), no redibujar
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    if (dx * dx + dy * dy < 0.25) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    setupStrokeStyles(ctx, dpr);

    // Trazo continuo y homogéneo con lineCap 'round' y lineJoin 'round'
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();

    lastPointRef.current = curr;
  };

  /**
   * Finaliza el trazo activo cuando se suelta el clic o se levanta el dedo.
   */
  const stopDrawing = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (e && e.pointerId && e.currentTarget && e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback silencioso
      }
    }
  };

  /**
   * Borra por completo el lienzo de firma para permitir reintentar el trazo.
   */
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  /**
   * Obtiene la imagen de la firma en formato Base64 PNG transparente puro.
   * @returns {string} DataURL en formato image/png transparente
   */
  const getSignatureDataUrl = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSigned) return "";
    return canvas.toDataURL("image/png");
  };

  return {
    canvasRef,
    hasSigned,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    getSignatureDataUrl,
    handleResize
  };
}

