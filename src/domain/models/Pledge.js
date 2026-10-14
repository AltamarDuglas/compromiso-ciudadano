// =============================================================================
// MODELO DE DOMINIO: Pledge.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Representa la entidad inmutable del compromiso firmado por el ciudadano,
// incluyendo su folio oficial, fecha de expedición y firma gráfica digital.
// =============================================================================

import { Signer } from './Signer.js';

export class Pledge {
  /**
   * Construye un nuevo compromiso ciudadano.
   * @param {Object} params
   * @param {string} [params.id] - Identificador único
   * @param {Signer} params.signer - Instancia del firmante
   * @param {string[]} params.commitments - IDs o títulos de compromisos elegidos
   * @param {string} [params.signatureDataUrl] - Imagen PNG en Base64 de la firma
   * @param {string} [params.folio] - Código oficial de registro (ej. #MON-2026-1502)
   * @param {Date} [params.createdAt] - Fecha de creación
   */
  constructor({
    id = null,
    signer,
    commitments = [],
    signatureDataUrl = "",
    folio = null,
    createdAt = new Date()
  }) {
    this.id = id || `pledge_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    this.signer = signer instanceof Signer ? signer : new Signer(signer?.fullName, signer?.sector);
    this.commitments = commitments;
    this.signatureDataUrl = signatureDataUrl;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.folio = folio || Pledge.generateFolio(this.createdAt);
  }

  /**
   * Genera un número de folio conmemorativo para el ciudadano.
   * @param {Date} date - Fecha del registro
   * @returns {string} Folio oficial
   */
  static generateFolio(date = new Date()) {
    const year = date.getFullYear();
    const randomSec = Math.floor(1000 + Math.random() * 9000);
    return `#MON-${year}-${randomSec}`;
  }

  /**
   * Formatea la fecha en español de forma elegante para certificados y tarjetas.
   * @returns {string} Fecha formateada (ej. "14 de Octubre de 2026")
   */
  getFormattedDate() {
    return this.createdAt.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
