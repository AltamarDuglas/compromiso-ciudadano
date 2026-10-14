// =============================================================================
// SERVICIO DE DOMINIO: PledgeValidationService.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP) y Open/Closed Principle (OCP).
// Valida que el ciudadano haya trazado su firma digital en el lienzo.
// El nombre es opcional para permitir que la firma sea pura y anónima si se desea.
// La firma gráfica es el requisito primordial.
// Sin uso de emojis.
// =============================================================================

export class PledgeValidationService {
  /**
   * Valida los datos provistos para estampar la firma.
   * @param {Object} formData
   * @param {string} [formData.fullName] - Nombre opcional
   * @param {string} [formData.sector] - Barrio o sector
   * @param {string[]} [formData.commitments] - Array de compromisos seleccionados
   * @param {boolean} formData.hasSigned - Bandera obligatoria de trazo en el lienzo
   * @returns {{ isValid: boolean, errors: string[] }}
   */
  static validate(formData) {
    const errors = [];

    // 1. Validación primordial: Trazo de la firma digital
    if (!formData.hasSigned) {
      errors.push("Por favor traza tu firma digital en el recuadro horizontal para sellar el pacto.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Calcula el porcentaje de energía cívica generado según las promesas marcadas.
   * @param {number} selectedCount - Cantidad de compromisos seleccionados
   * @param {number} totalAvailable - Total de compromisos posibles
   * @returns {number} Porcentaje de plenitud cívica
   */
  static calculateEnergyLevel(selectedCount = 0, totalAvailable = 5) {
    if (!selectedCount || totalAvailable <= 0) return 40;
    const ratio = Math.min(1, selectedCount / totalAvailable);
    return Math.round(40 + ratio * 60);
  }
}
