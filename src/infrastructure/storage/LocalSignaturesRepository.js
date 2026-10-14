// =============================================================================
// IMPLEMENTACIÓN CONCRETA: LocalSignaturesRepository.js
// =============================================================================
// Principio SOLID: Dependency Inversion Principle (DIP) y Liskov Substitution (LSP).
// Implementa ISignaturesRepository utilizando localStorage del navegador.
// Provee una semilla inicial de ciudadanos monterianos para enriquecer el muro
// desde el primer instante que el usuario interactúa.
// =============================================================================

import { ISignaturesRepository } from './ISignaturesRepository.js';
import { Pledge } from '../../domain/models/Pledge.js';
import { Signer } from '../../domain/models/Signer.js';

const STORAGE_KEY = "monteria_vivamos_bonito_pledges_v1";

// Semilla de inicio con habitantes de comunas y barrios icónicos de Montería
const INITIAL_SEED_PLEDGES = [
  {
    id: "seed_1",
    signer: { fullName: "Valentina Morales Gómez", sector: "La Castellana" },
    commitments: ["sinu_protection", "waste_schedule", "recycle_source", "civic_ambassador"],
    signatureDataUrl: "",
    folio: "#MON-2026-1483",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: "seed_2",
    signer: { fullName: "Dr. Carlos Burgos Hoyos", sector: "El Recreo" },
    commitments: ["sinu_protection", "waste_schedule", "civic_ambassador"],
    signatureDataUrl: "",
    folio: "#MON-2026-1482",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: "seed_3",
    signer: { fullName: "Mariana Petro Galindo", sector: "Cantaclaro" },
    commitments: ["waste_schedule", "clean_canals", "recycle_source", "civic_ambassador"],
    signatureDataUrl: "",
    folio: "#MON-2026-1481",
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString()
  },
  {
    id: "seed_4",
    signer: { fullName: "Andrés Felipe Ruiz", sector: "Margen Izquierda" },
    commitments: ["sinu_protection", "recycle_source", "clean_canals"],
    signatureDataUrl: "",
    folio: "#MON-2026-1480",
    createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString()
  },
  {
    id: "seed_5",
    signer: { fullName: "Elena Durango Ramos", sector: "La Granja" },
    commitments: ["waste_schedule", "recycle_source", "civic_ambassador", "sinu_protection"],
    signatureDataUrl: "",
    folio: "#MON-2026-1479",
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString()
  },
  {
    id: "seed_6",
    signer: { fullName: "Gustavo Negrete Buelvas", sector: "Miami, EE. UU. (Diáspora)" },
    commitments: ["sinu_protection", "civic_ambassador"],
    signatureDataUrl: "",
    folio: "#MON-2026-1478",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  }
];

export class LocalSignaturesRepository extends ISignaturesRepository {
  constructor() {
    super();
    this.initSeedIfNeeded();
  }

  /**
   * Inicializa datos ficticios de demostración si el almacenamiento local está vacío.
   */
  initSeedIfNeeded() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_PLEDGES));
      }
    } catch (e) {
      console.warn("No se pudo acceder a localStorage:", e);
    }
  }

  /**
   * Obtiene todos los compromisos almacenados convertidos a entidades Pledge.
   * @returns {Promise<Pledge[]>}
   */
  async getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : INITIAL_SEED_PLEDGES;
      return data.map(item => new Pledge({
        id: item.id,
        signer: new Signer(item.signer.fullName, item.signer.sector),
        commitments: item.commitments,
        signatureDataUrl: item.signatureDataUrl,
        folio: item.folio,
        createdAt: new Date(item.createdAt)
      }));
    } catch (err) {
      console.error("Error al leer firmas de almacenamiento local:", err);
      return [];
    }
  }

  /**
   * Guarda un nuevo compromiso al inicio de la lista.
   * @param {Pledge} pledge - Instancia del compromiso a persistir
   * @returns {Promise<Pledge>}
   */
  async save(pledge) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];

      const recordToSave = {
        id: pledge.id,
        signer: {
          fullName: pledge.signer.fullName,
          sector: pledge.signer.sector
        },
        commitments: pledge.commitments,
        signatureDataUrl: pledge.signatureDataUrl,
        folio: pledge.folio,
        createdAt: pledge.createdAt.toISOString()
      };

      // Colocar al inicio de la lista para visibilidad inmediata en el muro
      list.unshift(recordToSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return pledge;
    } catch (err) {
      console.error("Error al persistir firma:", err);
      return pledge;
    }
  }

  /**
   * Conteo total acumulado (base conmemorativa + nuevas firmas).
   * @returns {Promise<number>}
   */
  async getTotalCount() {
    const list = await this.getAll();
    // Sumamos la base conmemorativa de 1,480 firmas ciudadanas del programa
    return 1480 + list.length;
  }
}
