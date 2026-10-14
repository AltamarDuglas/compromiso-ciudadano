// =============================================================================
// SERVICIO DE DOMINIO: CertificateGeneratorService.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Se encarga exclusivamente de renderizar y exportar en alta definición (HD)
// el certificado oficial de Guardián de Montería en formato PNG para descarga directa.
// =============================================================================

export class CertificateGeneratorService {
  /**
   * Genera y descarga un certificado de alta calidad en formato PNG.
   * @param {Object} params
   * @param {string} params.citizenName - Nombre del ciudadano
   * @param {string} params.location - Ubicación o barrio
   * @param {string} params.folio - Número de folio oficial
   * @param {string} params.dateFormatted - Fecha formateada
   * @param {string} [params.signatureDataUrl] - Firma en Base64
   */
  static async downloadDiplomaPng({
    citizenName,
    location,
    folio,
    dateFormatted,
    signatureDataUrl
  }) {
    // 1. Crear canvas virtual de alta resolución (1200 x 720)
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");

    // 2. Fondo elegante Azul Noche Institucional con degradado suave
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 720);
    bgGrad.addColorStop(0, "#0a1329");
    bgGrad.addColorStop(0.5, "#12214d");
    bgGrad.addColorStop(1, "#0a1329");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 720);

    // 3. Franjas Cívicas de Campaña en el borde superior (Azul, Rojo, Amarillo)
    ctx.fillStyle = "#1e3a8a"; // Azul
    ctx.fillRect(40, 40, 440, 8);
    ctx.fillStyle = "#dc2626"; // Rojo
    ctx.fillRect(480, 40, 380, 8);
    ctx.fillStyle = "#f59e0b"; // Amarillo
    ctx.fillRect(860, 40, 300, 8);

    // 4. Marcos dorados conmemorativos
    ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 660);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, 1116, 636);

    // 5. Encabezado Oficial de la Campaña
    ctx.textAlign = "center";

    // Logo / Emblema Cívico
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px 'Outfit', sans-serif";
    ctx.fillText("TODOS", 600, 110);

    ctx.fillStyle = "#dc2626";
    ctx.font = "800 20px 'Outfit', sans-serif";
    ctx.fillText("SOMOS MONTERÍA", 600, 138);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "700 24px 'Caveat', cursive";
    ctx.fillText("¡Vivamos bonito!", 600, 172);

    // 6. Título del Diploma
    ctx.fillStyle = "#f8fafc";
    ctx.font = "800 26px 'Outfit', sans-serif";
    ctx.fillText("CERTIFICADO OFICIAL DE COMPROMISO CIUDADANO", 600, 235);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 17px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Se otorga con orgullo y gratitud de la ciudad a:", 600, 275);

    // 7. Nombre del Ciudadano
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic bold 42px 'Outfit', sans-serif";
    ctx.fillText(citizenName, 600, 340);

    // 8. Texto de Reconocimiento Cívico
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "400 17px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Como Guardián(a) activo(a) de Montería, por asumir el compromiso de cuidar el Río Sinú,", 600, 400);
    ctx.fillText("mantener las calles y canales limpios y promover el amor por nuestra Perla del Sinú.", 600, 430);

    // 9. Línea divisoria decorativa
    ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(350, 470);
    ctx.lineTo(850, 470);
    ctx.stroke();

    // 10. Título de Honor
    ctx.fillStyle = "#f59e0b";
    ctx.font = "800 16px 'Outfit', sans-serif";
    ctx.fillText("GUARDIÁN OFICIAL DE MONTERÍA", 600, 500);

    // 11. Incrustación de la firma si existe
    if (signatureDataUrl) {
      try {
        const sigImage = new Image();
        sigImage.src = signatureDataUrl;
        await new Promise((resolve) => {
          sigImage.onload = () => {
            // Dibujar la firma centrada sobre la línea
            ctx.drawImage(sigImage, 500, 510, 200, 60);
            resolve(true);
          };
          sigImage.onerror = () => resolve(false);
        });
      } catch (err) {
        console.warn("No se pudo incrustar la imagen de firma en canvas:", err);
      }
    }

    // 12. Metadatos de Folio, Fecha y Ubicación en el Pie
    ctx.fillStyle = "#94a3b8";
    ctx.font = "500 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`Ubicación: ${location}   •   Fecha: ${dateFormatted}   •   Folio Oficial: ${folio}`, 600, 630);

    // 13. Disparar descarga directa del archivo PNG en el navegador
    const safeName = citizenName.replace(/[^a-zA-Z0-9]/g, "_");
    const link = document.createElement("a");
    link.download = `Certificado_VivamosBonito_${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
}
