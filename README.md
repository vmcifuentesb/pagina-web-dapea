# DAPEA — Sitio Web Corporativo & Ecosistema Digital

Este repositorio contiene la aplicación web oficial de **DAPEA** ("*Drive Your Future*"), desarrollada bajo la arquitectura corporativa inspirada en **Bizicorp (Home Version Two)** y construida siguiendo los estándares de desarrollo de alto rendimiento (**WPO**) y la arquitectura de páginas web de **Promptend**.

---

## 1. Acerca de la Empresa

**DAPEA** es una firma de consultoría empresarial dedicada al fortalecimiento y aceleración de emprendimientos y PyMEs. Su metodología transforma la intuición empírica en decisiones inteligentes guiadas por datos duros en 5 ejes estratégicos: Finanzas, Planeación, Formalización, Marketing y Operaciones.

- **Slóganes Oficiales**:
  - *"Claridad que impulsa tu crecimiento."*
  - *"Decisiones inteligentes. Empresas que crecen."*
  - *"Drive Your Future"*
- **Contacto Principal**: Ing. Jorge Alberto Sánchez Román | `jsanchez@dapea.com.mx` | WhatsApp: `962-142 28 30`

---

## 2. Stack Tecnológico

El proyecto está diseñado bajo los principios de velocidad extrema, accesibilidad y dinamismo visual:

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Core Base** | **HTML5 Semántico + ES6+ JS** | Estructura ligera y ejecutable sin sobrecarga de frameworks heavy-weight. |
| **Diseño & Estilos** | **Vanilla CSS3 + Variables HSL/HEX** | Sistema de diseño nativo con glassmorphism, sombras pulidas y diseño adaptativo. |
| **Animaciones** | **GSAP (GreenSock Animation Platform)** | Parallax, timelines de animación y scroll triggers de grado corporativo. |
| **Iconografía** | **FontAwesome 6 Pro CDN** | Iconos vectoriales nítidos para cada pilar del acrónimo DAPEA. |
| **Optimizaciones WPO** | **Compress / Cache / Lazy Load** | Reglas `.htaccess`, preloads de assets y diferimiento de scripts para 100/100 PageSpeed. |

---

## 3. Paleta de Colores de la Marca (Códigos HEX & HSL)

La línea gráfica oficial de DAPEA transmite sobriedad ejecutiva, análisis técnico y proyección de alza:

| Color | HEX | RGB | Aplicación Principal |
| :--- | :---: | :---: | :--- |
| **Azul Noche Profundo** | `#081320` | `rgb(8, 19, 32)` | Fondos principales de pantalla y tarjetas ejecutivas. |
| **Azul Real Corporativo** | `#1E3A8A` | `rgb(30, 58, 138)` | Botones primarios, isotipo principal y títulos de peso. |
| **Azul Cyan Eléctrico** | `#2D9CDB` | `rgb(45, 156, 219)` | Flechas de crecimiento, resaltados y llamadas a la acción (CTAs). |
| **Blanco Hielo / Suave** | `#E6EEF7` | `rgb(230, 238, 247)` | Texto principal sobre fondos oscuros y tarjetas claras. |
| **Gris Frío Plateado** | `#AEB6C2` | `rgb(174, 182, 194)` | Subtítulos, bordes, líneas divisoras y texto secundario. |

---

## 4. Estructura de Proyecto

```text
pagina-web-dapea/
├── Arquitectura de página web/    # Estándares de arquitectura y guías WPO de Promptend
│   ├── Arquitectura y ecosistema para páginas web.md
│   ├── client_requirements.md
│   ├── guia_desarrollo_wpo.md
│   └── mejoras-implementadas.md
├── Manual de marca/               # Recursos vectoriales e imágenes oficiales
│   ├── Logo.png
│   ├── Logotipo.png
│   └── mockup_*.png
├── css/
│   └── styles.css                 # Sistema de diseño y variables cromáticas
├── js/
│   └── main.js                    # Interactividad, controlador GSAP y Quiz Wizard
├── .htaccess                      # Configuración de compresión Gzip y caché
├── index.html                     # Maqueta principal Bizicorp Home Version Two
├── robots.txt                     # Instrucciones de indexación para buscadores
├── sitemap.xml                    # Mapa del sitio XML para SEO
└── README.md                      # Documentación oficial del proyecto
```

---

## 5. Instalación y Desarrollo Local

1. Clona o abre la carpeta en tu entorno local.
2. Levanta un servidor estático (ej. `npx serve` o la extensión Live Server de VS Code):
   ```bash
   npx serve -p 8080 .
   ```
3. Visita `http://localhost:8080` en tu navegador.

---

## 6. Configuración para Producción

- Desplegar en servidores habilitados para HTTPS (Vercel, Netlify, Banahosting / Apache).
- Asegurarse de que el archivo `.htaccess` esté cargado en la raíz pública del dominio para activar la compresión y las cabeceras de caché de navegador.

---

**Desarrollada por Promptend** | [promptendweb.com](http://promptendweb.com/)
