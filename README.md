# TODOS Somos Montería | ¡Vivamos Bonito!
> **Aplicación Web Cívica Mobile-First con Framer Motion, Vanilla CSS y Metodología SOLID**

Bienvenido a la documentación oficial del proyecto **"TODOS Somos Montería - ¡Vivamos bonito!"**. Esta aplicación web fue concebida y desarrollada para transformar el pacto cívico y ambiental de la ciudad de Montería (Córdoba, Colombia) en una experiencia digital interactiva, hipnótica y memorable para la ciudadanía, optimizada primordialmente para dispositivos móviles táctiles (smartphones).

---

## Tabla de Contenido
1. [Propósito y Visión](#propósito-y-visión)
2. [Identidad Visual Oficial de la Campaña](#identidad-visual-oficial-de-la-campaña)
3. [Factores de Estimulación y Gamificación Cívica](#factores-de-estimulación-y-gamificación-cívica)
4. [Arquitectura del Software y Principios SOLID](#arquitectura-del-software-y-principios-solid)
5. [Estructura de Archivos del Proyecto](#estructura-de-archivos-del-proyecto)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Guía de Instalación y Ejecución Rápida](#guía-de-instalación-y-ejecución-rápida)
8. [Cómo Extender o Personalizar el Proyecto](#cómo-extender-o-personalizar-el-proyecto)
9. [Buenas Prácticas y Mantenibilidad](#buenas-prácticas-y-mantenibilidad)

---

## Propósito y Visión
Montería, la "Perla del Sinú", es una de las capitales más verdes y con mayor potencial ambiental de Colombia. El programa **"Vivamos Bonito"** y el movimiento **"TODOS Somos Montería"** buscan movilizar a cada habitante (y a la diáspora monteriana en el mundo) para comprometerse con:
- La protección activa del **Río Sinú** y la Ronda del Sinú.
- El respeto estricto de los horarios de recolección de residuos.
- La separación en la fuente y dignificación de los recicladores de oficio.
- Mantener los canales colectores libres de basura para evitar inundaciones.
- Fomentar el orgullo y la cultura ciudadana en cada barrio y comuna.

---

## Identidad Visual Oficial de la Campaña (La Ronda Vive / Alcaldía de Montería)
El diseño se basa fielmente en la plataforma oficial de la Alcaldía de Montería ([larondavive-front.vercel.app](https://larondavive-front.vercel.app/)) y la campaña *"TODOS Somos Montería - ¡Vivamos bonito!"*:
- **Azul Montería Oficial (`--monteria-blue: #2563eb`)**: Color insignia de los botones de acción principal, enlaces destacados y resplandor activo (`box-shadow: 0 6px 18px rgba(37,99,235,0.25)`).
- **Azul Oscuro de Contraste (`--monteria-blue-dark: #1d4ed8`)**: Para estados de interacción táctil (`:hover`, `:active`) y acentos de títulos.
- **Rojo Montería Institucional (`--monteria-red: #dc2626`)**: Color de la bandera cívica, micro-resplandor y dinamismo institucional.
- **Amarillo Bandera (`--star-yellow: #f59e0b` / `#fbbf24`)**: La estrella cívica central oficial de la bandera de Montería.
- **Blanco Superficie (`--surface-white: #ffffff`)**: Tarjetas limpias, botones secundarios y espacios despejados.
- **Fondo con Gradiente Suave (`--bg-gradient`)**: `linear-gradient(180deg, #f1f5f9, #f8fafc 50%, #eff6ff)` aportando un tinte fresco, ordenado y descansado.
- **Tipografías Institucionales**:
  - `Georgia / Serif`: Títulos de porte institucional clásico.
  - `Outfit`: Títulos bold, display moderno e impactante.
  - `Plus Jakarta Sans`: Cuerpo de texto claro, descansado y de alta legibilidad en smartphones.
  - `Caveat`: Acento humano y cálido para la frase *"¡Vivamos bonito!"*.

---

## Factores de Estimulación y Gamificación Cívica (Feature de Grabado Monumental)
Para lograr que firmar el pacto sea un momento de **máxima satisfacción visual, cinemática y sensorial**:
1. **Botón de Alto Impacto ("Hacer mi pacto con Montería")**:
   - Con pulso magnético continuo y resplandor en Azul Montería Oficial (`#2563eb`), invitando de forma irresistible al usuario a sumarse.
2. **Estudio Horizontal en Pantalla Completa (`FullscreenSignatureStudio`)**:
   - Al pulsar el botón, el espacio de firma se despliega en pantalla completa horizontal, aprovechando todo el ancho panorámico para trazar la firma con total holgura en smartphones y tablets.
   - Selección rápida de barrio en Montería con chips interactivos e íconos vectoriales SVG limpios de `lucide-react`.
   - Botón destacado "Firmar".
3. **Animación Cinemática de Vuelo hacia la Pantalla (`Flying Stamp Animation`)**:
   - Al pulsar el botón "Firmar", la firma trazada se eleva tridimensionalmente (`scale: 1 -> 2.4 -> 1`, z-index y destello shockwave), viaja hacia la pantalla y se proyecta velozmente hacia el Muro Monumental.
4. **Muro Monumental de Piedra Grabada (`EngravedMonteriaWall`)**:
   - La firma se estampa en la pared con efecto de **tallado en bajo relieve** (*carved stone effect* con sombra interior y bisel de luz blanca), acompañada de una onda expansiva de impacto.
   - **Regla Estricta de Firma Pura**: La firma en el muro **NO muestra el nombre de la persona**. Es únicamente el trazo auténtico en formato PNG transparente grabado en la cantera.
   - **Algoritmo de Colocación No Superpuesta (`WallLayoutService`)**: Las firmas se ubican una al lado de la otra con ligeras variaciones artesanales calculadas matemáticamente para que **NUNCA se superpongan**.
   - **Alejamiento Cinemático de Plano (Zoom-Out Progresivo)**: A medida que más ciudadanos firman, la cámara del muro se aleja automáticamente de forma fluida para mostrar la totalidad de firmas grabadas.
   - Controles interactivos de lupa para acercar, alejar o restablecer la vista panorámica del muro.
5. **Credencial Holográfica 3D (`HolographicGuardianCard`)**:
   - Tarjeta interactiva con inclinación física (`3D tilt`), reflejo metálico, folio oficial único y botones directos para compartir en WhatsApp y descargar el diploma en HD PNG.
6. **Política Estricta de Cero Emojis**:
   - Toda la interfaz utiliza diseño sobrio, institucional y moderno con iconografía vectorial pura (`lucide-react`), sin ningún emoji en textos, código ni interfaz.

---

## Arquitectura del Software y Principios SOLID
El proyecto está rigurosamente estructurado bajo los 5 principios fundamentales de **SOLID** para garantizar que cualquier desarrollador pueda entenderlo, mantenerlo y escalarlo:

### 1. Single Responsibility Principle (SRP) - Responsabilidad Única
Cada módulo, clase y componente tiene una única razón para cambiar:
- `Signer.js`: Solo gestiona los datos e iniciales del ciudadano firmante.
- `PledgeValidationService.js`: Solo valida las reglas de negocio del formulario y la existencia de la firma digital.
- `WallLayoutService.js`: Solo calcula las coordenadas no colisionantes de cada firma y el factor de zoom dinámico.
- `SignatureSvgHelper.js`: Solo provee trazos caligráficos vectoriales deterministas para firmas iniciales.
- `CertificateGeneratorService.js`: Solo se encarga de renderizar y exportar el diploma en imagen PNG de alta definición.
- `useSignatureCanvas.js`: Solo administra los eventos táctiles y el renderizado del trazo de firma.

### 2. Open/Closed Principle (OCP) - Abierto para Extensión, Cerrado para Modificación
- `CommitmentOption.js` define el catálogo oficial de acciones. Si en el futuro se desean añadir 10 nuevas acciones cívicas para Montería, no se modifica la lógica del formulario ni del validador; solo se amplía la lista de compromisos.

### 3. Liskov Substitution Principle (LSP) - Sustitución de Liskov
- `LocalSignaturesRepository` hereda e implementa `ISignaturesRepository`. Puede ser sustituido por un repositorio en la nube (`FirebaseSignaturesRepository` o `SupabaseSignaturesRepository`) sin alterar ninguna línea de los hooks o componentes.

### 4. Interface Segregation Principle (ISP) - Segregación de Interfaces
- En lugar de tener servicios masivos acoplados, la persistencia (`ISignaturesRepository`), la generación visual (`CertificateGeneratorService`) y el adaptador de compartir (`WebShareAdapter`) están estrictamente aislados.

### 5. Dependency Inversion Principle (DIP) - Inversión de Dependencias
- Los componentes de alto nivel (`App.jsx` y `useSignaturesFeed.js`) dependen de abstracciones y contratos de repositorio, no de un almacenamiento acoplado.

---

## Estructura de Archivos del Proyecto

```
Mis proyectos/
├── README.md                           # Documentación técnica completa (este archivo)
├── index.html                          # Punto de entrada HTML, SEO, Viewport Mobile y Fuentes
├── package.json                        # Definición de scripts y dependencias
├── vite.config.js                      # Configuración de compilación con Vite y React
└── src/
    ├── domain/                         # Capa de Dominio (Modelos y Lógica de Negocio)
    │   ├── models/
    │   │   ├── CommitmentOption.js     # Catálogo oficial de compromisos y sectores
    │   │   ├── Signer.js               # Entidad del firmante (nombre, sector, iniciales)
    │   │   └── Pledge.js               # Entidad del compromiso (folio, fecha, firma)
    │   └── services/
    │       ├── PledgeValidationService.js   # Reglas de validación
    │       ├── WallLayoutService.js         # Algoritmo de empaquetado sin superposiciones y zoom
    │       ├── SignatureSvgHelper.js        # Fallback vectorial de firmas caligráficas
    │       └── CertificateGeneratorService.js # Exportador HD en canvas a PNG
    ├── infrastructure/                 # Capa de Infraestructura (Adaptadores y Persistencia)
    │   ├── storage/
    │   │   ├── ISignaturesRepository.js      # Contrato/Interfaz del repositorio
    │   │   └── LocalSignaturesRepository.js  # Implementación LocalStorage + Semilla inicial
    │   └── sharing/
    │       └── WebShareAdapter.js            # Adaptador Web Share API y WhatsApp
    ├── hooks/                          # Custom Hooks desacoplados
    │   ├── useSignatureCanvas.js       # Manejo táctil del canvas y trazo fluido
    │   ├── useSignaturesFeed.js        # Estado reactivo del muro y totalizadores
    │   └── useHolographicTilt.js       # Cálculo físico 3D para la credencial
    ├── components/                     # Componentes de Presentación Modulares
    │   ├── layout/
    │   │   ├── MobileHeader.jsx        # Encabezado institucional con cinta tricolor
    │   │   └── CivicFooter.jsx         # Pie con ondas del Río Sinú
    │   ├── campaign/
    │   │   ├── HeroBanner.jsx          # Titular H1 semántico y botón "Hacer mi pacto con Montería"
    │   │   └── EnergyCounterBar.jsx    # Métricas de impacto cívico
    │   ├── pledge/
    │   │   └── FullscreenSignatureStudio.jsx # Estudio horizontal en pantalla completa con vuelo 3D
    │   ├── wall/
    │   │   └── EngravedMonteriaWall.jsx # Muro Monumental grabado en relieve con alejamiento de plano
    │   ├── certificate/
    │   │   ├── HolographicGuardianCard.jsx # Tarjeta 3D con brillo reflectivo
    │   │   └── CertificateModal.jsx    # Modal con confeti, descarga y WhatsApp
    ├── styles/                         # Sistema de Diseño en Vanilla CSS Puro
    │   ├── tokens.css                  # Variables CSS (paleta cromática y tipografías)
    │   ├── animations.css              # Keyframes cinemáticos y físicas de vuelo/estampado
    │   └── app.css                     # Estilos Mobile-First y componentes
    ├── App.jsx                         # Orquestador principal de la experiencia
    └── main.jsx                        # Punto de montaje de React 18
```

---

## Tecnologías Utilizadas
- **React 18**: Biblioteca líder para interfaces de usuario declarativas y reactivas.
- **Vite 5**: Servidor de desarrollo ultrarrápido y empaquetador para producción.
- **Framer Motion 11**: Animaciones elásticas, vuelo tridimensional y transiciones de cámara suaves.
- **Lucide React**: Iconografía vectorial limpia y coherente sin uso de emojis.
- **Canvas-Confetti**: Efectos de celebración festiva con aceleración por hardware.
- **Vanilla CSS Moderno**: Variables CSS, CSS Grid, Flexbox y Glassmorphism sin dependencias pesadas ni frameworks externos de CSS.

---

## Guía de Instalación y Ejecución Rápida

### Requisitos Previos
Tener instalado **Node.js** (versión 18 o superior recomendada).

### Pasos para iniciar en tu máquina:
1. Abre tu terminal en la carpeta del proyecto:
   ```bash
   cd "c:\Users\Hewlett-Packard\OneDrive\Desktop\Mis proyectos"
   ```

2. Instala las dependencias (si aún no lo has hecho):
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

4. Abre tu navegador web en la dirección indicada (por defecto: `http://localhost:3000`).

5. Para probar la experiencia **Mobile-First**:
   - Presiona `F12` en Google Chrome o Edge.
   - Activa el modo de emulación de dispositivos móviles (`Ctrl + Shift + M`).
   - Selecciona un modelo de teléfono (ej. *iPhone 14 Pro* o *Pixel 7*).
   - Haz clic en **"Hacer mi pacto con Montería"**, dibuja tu firma horizontal en pantalla completa y pulsa **"Firmar"** para contemplar el vuelo 3D y el grabado en relieve en la pared de Montería.

---

## Cómo Extender o Personalizar el Proyecto

### 1. ¿Cómo agregar nuevos barrios o corregimientos de Montería?
Abre el archivo [CommitmentOption.js](file:///src/domain/models/CommitmentOption.js) y agrega los nuevos sectores en el arreglo `MONTERIA_SECTORS`:
```javascript
export const MONTERIA_SECTORS = [
  "La Granja",
  "Cantaclaro",
  "Mocarí",        // <-- Nuevo barrio
  "Garzones",      // <-- Nuevo corregimiento
  ...
];
```

### 2. ¿Cómo conectar una base de datos en tiempo real (Firebase o Supabase)?
Crea un nuevo archivo en `src/infrastructure/storage/SupabaseSignaturesRepository.js` que implemente la clase base `ISignaturesRepository`:
```javascript
import { ISignaturesRepository } from './ISignaturesRepository.js';

export class SupabaseSignaturesRepository extends ISignaturesRepository {
  async getAll() { /* consulta a Supabase */ }
  async save(pledge) { /* inserción en Supabase */ }
  async getTotalCount() { /* conteo en Supabase */ }
}
```
Luego simplemente inyecta esta clase en `useSignaturesFeed.js`. ¡Gracias a SOLID (DIP), el resto del sistema funcionará sin tocar ningún componente visual!

---

## Buenas Prácticas y Mantenibilidad
- Todos los archivos cuentan con comentarios detallados en español en la cabecera, explicando su responsabilidad y decisiones técnicas.
- No se utilizan estilos mágicos (`inlines`) desordenados; todos los valores cromáticos provienen de `tokens.css`.
- Cada elemento interactivo cuenta con estados táctiles `:active`, `:focus` y retroalimentación visual accesible.
- Se mantiene una política de cero emojis en código, interfaz y documentación.

*TODOS Somos Montería • ¡Vivamos bonito! — Cuidar nuestra ciudad es orgullo de todos.*

