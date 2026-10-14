// =============================================================================
// MODELO DE DOMINIO: CommitmentOption.js
// =============================================================================
// Principio SOLID: Single Responsibility Principle (SRP).
// Define el catálogo oficial de compromisos y sectores de Montería.
// Sin uso de emojis; utiliza identificadores de íconos vectoriales modernos.
// =============================================================================

/**
 * Catálogo maestro de acciones cívicas promovidas por la Alcaldía de Montería
 * dentro del programa cívico y ambiental "TODOS Somos Montería - ¡Vivamos Bonito!".
 */
export const OFFICIAL_COMMITMENTS = [
  {
    id: "sinu_protection",
    iconName: "Droplets", // Ícono vectorial de agua/río
    title: "Cuidar la Ronda y el Río Sinú",
    desc: "Cero basuras y plásticos en las orillas, playas y senderos del río emblemático.",
    defaultSelected: true
  },
  {
    id: "waste_schedule",
    iconName: "Clock", // Ícono vectorial de tiempo/horarios
    title: "Respetar Horarios de Recolección",
    desc: "Sacar los residuos únicamente en los días y horas estipuladas para erradicar botaderos.",
    defaultSelected: true
  },
  {
    id: "recycle_source",
    iconName: "Recycle", // Ícono vectorial de reciclaje
    title: "Separar y Dignificar el Reciclaje",
    desc: "Separar residuos limpios y secos apoyando la labor de nuestros recicladores de oficio.",
    defaultSelected: true
  },
  {
    id: "clean_canals",
    iconName: "ShieldAlert", // Ícono vectorial de protección de drenajes
    title: "Canales y Drenajes Despejados",
    desc: "No arrojar podas, escombros ni desechos a los colectores de lluvia de mi barrio.",
    defaultSelected: false
  },
  {
    id: "civic_ambassador",
    iconName: "Award", // Ícono vectorial de liderazgo cívico
    title: "Ser Embajador de Cultura Ciudadana",
    desc: "Inspirar a vecinos y familiares con orgullo para que todos vivamos más bonito.",
    defaultSelected: true
  }
];

/**
 * Lista de barrios y sectores representativos de las comunas de Montería
 * organizados para selección táctil instantánea en pantallas móviles.
 */
export const MONTERIA_SECTORS = [
  "La Granja",
  "Cantaclaro",
  "La Castellana",
  "El Recreo",
  "Margen Izquierda",
  "Centro",
  "La Pradera",
  "Mogambo",
  "Pasatiempo",
  "Rancho Grande",
  "Montería en Colombia",
  "Diáspora en el Exterior"
];
