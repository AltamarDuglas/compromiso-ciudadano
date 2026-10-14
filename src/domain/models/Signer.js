// =============================================================================
// MODELO DE DOMINIO: Signer.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Modela la identidad y atributos del ciudadano que firma el pacto cívico,
// encapsulando la generación de iniciales y normalización de texto.
// =============================================================================

export class Signer {
  /**
   * Crea una instancia de un ciudadano firmante.
   * @param {string} fullName - Nombre completo del ciudadano
   * @param {string} sector - Barrio, comuna o ubicación
   */
  constructor(fullName, sector) {
    this.fullName = fullName ? fullName.trim() : "";
    this.sector = sector ? sector.trim() : "Montería";
  }

  /**
   * Genera las iniciales en mayúscula (máximo 2 letras) para el avatar circular.
   * Ejemplo: "Juan Camilo Paternina" -> "JP"
   * @returns {string} Iniciales del firmante
   */
  getInitials() {
    if (!this.fullName) return "MO";
    const parts = this.fullName.split(" ").filter(Boolean);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /**
   * Retorna una representación amigable de la ubicación.
   * @returns {string} Ubicación formateada
   */
  getFormattedLocation() {
    if (this.sector.toLowerCase().includes("montería") || this.sector.toLowerCase().includes("colombia") || this.sector.toLowerCase().includes("exterior")) {
      return this.sector;
    }
    return `Montería (${this.sector})`;
  }
}
