// =============================================================================
// CONTRATO / INTERFAZ: ISignaturesRepository.js
// =============================================================================
// Principio SOLID: Dependency Inversion Principle (DIP) e Interface Segregation.
// Define el contrato de persistencia de compromisos y firmas para que la capa
// de componentes y servicios no dependa de una implementación de almacenamiento directa.
// =============================================================================

export class ISignaturesRepository {
  /**
   * Obtiene la lista de todos los compromisos registrados.
   * @returns {Promise<Array>} Lista de objetos Pledge
   */
  async getAll() {
    throw new Error("El método getAll() debe ser implementado por la clase concreta.");
  }

  /**
   * Guarda un nuevo compromiso.
   * @param {Object} pledge - Entidad Pledge a persistir
   * @returns {Promise<Object>} Compromiso guardado
   */
  async save(pledge) {
    throw new Error("El método save() debe ser implementado por la clase concreta.");
  }

  /**
   * Obtiene el conteo total de firmas cívicas.
   * @returns {Promise<number>} Número total de firmas
   */
  async getTotalCount() {
    throw new Error("El método getTotalCount() debe ser implementado por la clase concreta.");
  }
}
