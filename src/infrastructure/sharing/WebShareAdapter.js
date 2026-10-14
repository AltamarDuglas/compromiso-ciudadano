// =============================================================================
// ADAPTADOR DE INFRAESTRUCTURA: WebShareAdapter.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Facilita compartir el compromiso y credencial del ciudadano por WhatsApp
// o el menú nativo del smartphone.
// Sin uso de emojis.
// =============================================================================

export class WebShareAdapter {
  /**
   * Comparte el pacto ciudadano vía API nativa o WhatsApp.
   * @param {Object} params
   * @param {string} params.citizenName - Nombre del ciudadano
   * @param {string} params.sector - Barrio o sector
   * @param {string} params.folio - Folio oficial
   * @returns {Promise<boolean>} Indica si la acción se ejecutó con éxito
   */
  static async sharePledge({ citizenName, sector, folio }) {
    const textMessage = `He firmado el Pacto Ciudadano "TODOS Somos Montería - ¡Vivamos Bonito!".\n\n` +
      `Soy ${citizenName} y desde ${sector} me comprometo a cuidar nuestro Río Sinú y mantener la ciudad limpia e impecable.\n` +
      `Mi folio oficial de Guardián es: ${folio}.\n\n` +
      `Únete tú también al compromiso cívico de Montería:\n${window.location.href}`;

    // 1. Intentar usar la API nativa de compartir del celular (Android / iOS)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TODOS Somos Montería - ¡Vivamos Bonito!",
          text: textMessage,
          url: window.location.href
        });
        return true;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("Fallo en navigator.share, usando fallback WhatsApp:", err);
        }
      }
    }

    // 2. Fallback directo a WhatsApp
    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    return true;
  }
}
