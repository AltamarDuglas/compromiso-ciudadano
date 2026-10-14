// =============================================================================
// SERVICIO DE DOMINIO: WallLayoutService.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Calcula las coordenadas espaciales precisas para cada firma en el Muro
// Monumental de Montería, garantizando de forma matemática que NUNCA se superpongan.
// Modela la estética de "tallado en piedra" y calcula la escala de alejamiento (zoom-out).
// =============================================================================

export class WallLayoutService {
  /**
   * Configuración de la cuadrícula orgánica de piedra del muro.
   * Dimensiones optimizadas para firmas legibles en dispositivos móviles y de escritorio.
   */
  static CELL_WIDTH = 200;   // Ancho del bloque de tallado por firma
  static CELL_HEIGHT = 110;  // Alto del bloque de tallado por firma
  static WALL_PADDING_X = 24;
  static WALL_PADDING_Y = 24;

  /**
   * Calcula la distribución espacial de una lista de firmas en el muro con offsets
   * pseudoaleatorios controlados dentro de cada celda para evitar cualquier colisión.
   * 
   * @param {Array} pledges - Lista de objetos Pledge
   * @param {number} containerWidth - Ancho disponible del viewport en px
   * @returns {Object} { placedPledges, wallBounds, autoZoomScale }
   */
  static layoutPledges(pledges = [], containerWidth = 400) {
    if (!pledges || pledges.length === 0) {
      return {
        placedPledges: [],
        wallBounds: { width: containerWidth, height: 320 },
        autoZoomScale: 1
      };
    }

    const totalCount = pledges.length;

    // Determinar cantidad de columnas óptimas para un muro panorámico armónico
    // Para pocas firmas (<=4) usa 2 columnas; de 5 a 9 usa 3 columnas; luego se amplía suavemente
    let columns = 2;
    if (totalCount >= 5 && totalCount <= 9) {
      columns = 3;
    } else if (totalCount >= 10 && totalCount <= 16) {
      columns = 4;
    } else if (totalCount >= 17) {
      columns = Math.min(6, Math.ceil(Math.sqrt(totalCount * 1.3)));
    }

    const rows = Math.ceil(totalCount / columns);

    const wallContentWidth = columns * this.CELL_WIDTH;
    const wallContentHeight = rows * this.CELL_HEIGHT;
    const totalWallWidth = wallContentWidth + (this.WALL_PADDING_X * 2);
    const totalWallHeight = wallContentHeight + (this.WALL_PADDING_Y * 2);

    const placedPledges = pledges.map((pledge, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);

      // Desplazamiento pseudoaleatorio determinista (evita saltos bruscos entre renders)
      // Basado en el id del pledge o el índice numérico
      const hashSeed = pledge.id ? 
        pledge.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 9301 :
        index * 9301;
      const pseudoSeed = (hashSeed + 49297) % 233280;
      const rnd1 = (pseudoSeed / 233280) - 0.5; // -0.5 a +0.5
      const rnd2 = (((pseudoSeed * 17) % 233280) / 233280) - 0.5;

      // Desplazamiento trabado por filas (como bloques de piedra tallada)
      const rowStagger = (row % 2 === 1) ? (this.CELL_WIDTH * 0.15) : 0;

      // Margen de seguridad estricto: variación máxima de +-10% del tamaño de la celda
      // Con un tamaño de firma de 80% de la celda, NUNCA colisionan entre sí
      const offsetX = rnd1 * (this.CELL_WIDTH * 0.16) + rowStagger;
      const offsetY = rnd2 * (this.CELL_HEIGHT * 0.14);
      const subtleRotation = rnd1 * 4.5; // Inclinación artesanal (-2.25deg a +2.25deg)

      const x = this.WALL_PADDING_X + (col * this.CELL_WIDTH) + offsetX + (this.CELL_WIDTH * 0.08);
      const y = this.WALL_PADDING_Y + (row * this.CELL_HEIGHT) + offsetY + (this.CELL_HEIGHT * 0.08);

      return {
        ...pledge,
        layout: {
          x,
          y,
          width: this.CELL_WIDTH * 0.82,
          height: this.CELL_HEIGHT * 0.80,
          rotation: subtleRotation,
          col,
          row
        }
      };
    });

    // Cálculo del alejamiento cinemático de cámara (Zoom-out progresivo):
    // El plano se aleja de forma continua y suave para que todas las firmas quepan en el ancho del muro
    const effectiveContainerWidth = Math.max(300, containerWidth - 28);
    const fitWidthScale = effectiveContainerWidth / totalWallWidth;

    // Escala acotada: en pocas firmas escala 1.0 (tamaño grande), a medida que crece se aleja hasta 0.45
    const autoZoomScale = Math.max(0.42, Math.min(1.0, fitWidthScale));

    return {
      placedPledges,
      wallBounds: { 
        width: totalWallWidth, 
        height: totalWallHeight 
      },
      autoZoomScale
    };
  }
}

