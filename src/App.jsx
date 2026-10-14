// =============================================================================
// COMPONENTE RAÍZ: App.jsx
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP) e Inversión de Dependencias.
// Orquesta la experiencia de la aplicación "TODOS Somos Montería - ¡Vivamos Bonito!".
// Integra:
// - Botón llamativo: "Hacer mi pacto con Montería"
// - Estudio horizontal en pantalla completa (FullscreenSignatureStudio)
// - Animación cinemática de vuelo y estampado hacia la pantalla
// - Muro Monumental grabado en bajo relieve (EngravedMonteriaWall) con zoom-out progresivo
// - Modal de Credencial Holográfica 3D
// - Cero emojis en toda la aplicación
// =============================================================================

import React, { useState } from 'react';
import { MobileHeader } from './components/layout/MobileHeader.jsx';
import { HeroBanner } from './components/campaign/HeroBanner.jsx';
import { EnergyCounterBar } from './components/campaign/EnergyCounterBar.jsx';
import { EngravedMonteriaWall } from './components/wall/EngravedMonteriaWall.jsx';
import { FullscreenSignatureStudio } from './components/pledge/FullscreenSignatureStudio.jsx';
import { CertificateModal } from './components/certificate/CertificateModal.jsx';
import { CivicFooter } from './components/layout/CivicFooter.jsx';
import { useSignaturesFeed } from './hooks/useSignaturesFeed.js';

export function App() {
  // Hook que sincroniza las firmas y totalizadores
  const { pledges, totalCount, totalActionsCount, addPledge } = useSignaturesFeed();

  // Control del estudio de firma en pantalla completa horizontal
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Control del modal de consagración con la credencial oficial
  const [activeModalPledge, setActiveModalPledge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ID de la última firma estampada para desencadenar la animación de choque y relieve en el muro
  const [lastStampedId, setLastStampedId] = useState(null);

  /**
   * Abre el estudio de firma horizontal en pantalla completa
   */
  const handleOpenStudio = () => {
    setIsStudioOpen(true);
  };

  /**
   * Cierra el estudio de firma
   */
  const handleCloseStudio = () => {
    setIsStudioOpen(false);
  };

  /**
   * Manejador ejecutado cuando la firma termina su animación de vuelo
   * y se estampa en el Muro Monumental.
   * @param {Pledge} newPledge - Instancia del compromiso validado
   */
  const handlePledgeSigned = async (newPledge) => {
    // 1. Cerrar el estudio horizontal
    setIsStudioOpen(false);

    // 2. Marcar la firma como la recién estampada para efectos de grabado en relieve
    setLastStampedId(newPledge.id);

    // 3. Persistir en el repositorio y actualizar el muro
    await addPledge(newPledge);

    // 4. Scroll suave hacia el muro para contemplar la firma estampada
    setTimeout(() => {
      const wallElement = document.querySelector('.engraved-wall-section');
      if (wallElement) {
        wallElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);

    // 5. Tras contemplar el estampado y el alejamiento de plano en el muro, abrir la credencial
    setTimeout(() => {
      setActiveModalPledge(newPledge);
      setIsModalOpen(true);
    }, 1800);
  };

  /**
   * Cierra el modal de la credencial oficial
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mobile-app-wrapper">
      {/* 1. Barra de identidad institucional oficial con bandera de Montería */}
      <MobileHeader />

      {/* 2. Sección Hero con titular y botón llamativo: "Hacer mi pacto con Montería" */}
      <HeroBanner onOpenSignatureStudio={handleOpenStudio} />

      {/* 3. Métricas de impacto ciudadano */}
      <EnergyCounterBar
        totalSignatures={totalCount}
        totalActions={totalActionsCount}
      />

      {/* 4. Muro Monumental de Firmas Grabadas en Relieve con Zoom-Out Dinámico */}
      <EngravedMonteriaWall 
        pledges={pledges} 
        lastStampedPledgeId={lastStampedId}
      />

      {/* 5. Pie institucional con el Río Sinú */}
      <CivicFooter />

      {/* 6. Estudio de Firma Horizontal en Pantalla Completa */}
      <FullscreenSignatureStudio
        isOpen={isStudioOpen}
        onClose={handleCloseStudio}
        onPledgeSigned={handlePledgeSigned}
      />

      {/* 7. Modal de Consagración: Credencial Holográfica 3D */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pledge={activeModalPledge}
      />
    </div>
  );
}

export default App;
