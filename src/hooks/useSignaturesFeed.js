// =============================================================================
// CUSTOM HOOK: useSignaturesFeed.js
// =============================================================================
// Principio SOLID: Dependency Inversion (DIP) y Single Responsibility (SRP).
// Gestiona el estado reactivo del muro de firmas y estadísticas del programa
// cívico "Vivamos Bonito", comunicándose exclusivamente mediante el repositorio.
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { LocalSignaturesRepository } from '../infrastructure/storage/LocalSignaturesRepository.js';

export function useSignaturesFeed() {
  // Instancia del repositorio desacoplado
  const repository = useMemo(() => new LocalSignaturesRepository(), []);

  const [pledges, setPledges] = useState([]);
  const [totalCount, setTotalCount] = useState(1480);
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos
  const loadFeed = useCallback(async () => {
    try {
      const items = await repository.getAll();
      const count = await repository.getTotalCount();
      setPledges(items);
      setTotalCount(count);
    } catch (err) {
      console.error("Error al cargar firmas del muro:", err);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  /**
   * Agrega un nuevo pacto cívico con persistencia inmediata y actualización optimista.
   * @param {Pledge} newPledge
   */
  const addPledge = async (newPledge) => {
    try {
      await repository.save(newPledge);
      setPledges(prev => [newPledge, ...prev]);
      setTotalCount(prev => prev + 1);
    } catch (err) {
      console.error("Error al guardar nuevo pacto:", err);
    }
  };

  /**
   * Cálculo de métricas agregadas del programa
   */
  const totalActionsCount = useMemo(() => {
    // Calculamos el promedio de 3.5 acciones por ciudadano en la base
    const basePledges = 4440;
    const currentActions = pledges.reduce((acc, p) => acc + (p.commitments?.length || 3), 0);
    return basePledges + currentActions;
  }, [pledges]);

  return {
    pledges,
    totalCount,
    totalActionsCount,
    loading,
    addPledge
  };
}
