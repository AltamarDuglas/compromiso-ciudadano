// =============================================================================
// SERVICIO DE DOMINIO: SignatureSvgHelper.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Provee trazos de firma caligráfica vectorial para registros históricos
// o para visualización uniforme en el Muro Monumental grabado.
// Sin uso de emojis.
// =============================================================================

export class SignatureSvgHelper {
  /**
   * Colección de curvas SVG bezier representativas de firmas reales.
   */
  static CALIGRAPHIC_PATHS = [
    "M 15 35 Q 35 10 55 30 T 95 25 T 135 32 Q 160 5 180 35 M 40 42 Q 90 46 170 38",
    "M 20 40 C 30 15 60 10 70 35 S 110 50 130 25 S 175 35 185 20 M 35 48 Q 110 38 165 44",
    "M 15 25 Q 45 45 75 18 T 125 35 T 160 15 T 185 30 M 50 38 L 170 38",
    "M 25 38 C 45 10 55 5 75 35 C 95 55 125 15 155 30 S 180 20 190 28 M 20 45 Q 85 40 180 42",
    "M 18 30 Q 30 5 50 25 T 90 35 T 130 15 T 170 30 T 188 22 M 30 40 L 160 42"
  ];

  /**
   * Obtiene una curva caligráfica determinista para un nombre dado.
   * @param {string} name - Nombre del firmante
   * @returns {string} Path SVG
   */
  static getSvgPathForName(name = "") {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % this.CALIGRAPHIC_PATHS.length;
    return this.CALIGRAPHIC_PATHS[index];
  }
}
