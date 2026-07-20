# OptifAI — Landing page

Landing page corporativa de **OptifAI**, agencia de desarrollo web y software a
medida con base en Asunción, Paraguay.

El objetivo del sitio es conseguir contactos de potenciales clientes. Está
construido en español e inglés, con tema claro y oscuro, y preparado para
desplegarse en Vercel.

---

## 1. Qué es este proyecto

Un sitio de una sola página (más dos páginas legales) con:

- Hero con mockup de producto generado en HTML/CSS (sin imágenes externas).
- Siete servicios, divididos en tres principales y cuatro complementarios.
- Beneficios, proceso de trabajo, portfolio, tecnologías y preguntas frecuentes.
- Formulario de contacto validado en cliente y servidor, con envío por Resend.
- WhatsApp, Instagram y correo centralizados en un único archivo de configuración.
- SEO técnico completo: metadatos por idioma, `hreflang`, canonical, sitemap,
  robots, manifest, Open Graph generado y datos estructurados JSON-LD.

---

## 2. Tecnologías

| Área | Herramienta |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Lenguaje | TypeScript (modo estricto) |
| Estilos | Tailwind CSS v4 (configuración CSS-first) |
| Internacionalización | next-intl 4 |
| Tema claro/oscuro | next-themes |
| Animaciones | Motion |
| Formulario | React Hook Form + Zod |
| Iconos | Lucide React |
| Correo | Resend |
| Calidad | ESLint + `tsc --noEmit` |

No se usa base de datos. Todo el contenido editable vive en archivos de datos y
de traducción.

---

## 3. Requisitos

- **Node.js 20 o superior** (probado en Node 24).
- **npm** (el proyecto usa npm; hay un `package-lock.json` versionado).

---

## 4. Instalación

```bash
npm install
```

---

## 5. Ejecución local

```bash
npm run dev       # servidor de desarrollo en http://localhost:3000
npm run build     # build de producción
npm run start     # sirve el build de producción
npm run lint      # ESLint
npm run typecheck # TypeScript sin emitir archivos
```

La raíz `/` redirige automáticamente a `/es` o `/en` según el idioma del
navegador, con `/es` como valor por defecto.

El desarrollo local y una demo en Vercel funcionan sin configurar variables de
entorno. Para ejecutar un build de producción fuera de Vercel hay que definir
`NEXT_PUBLIC_SITE_URL` con una URL absoluta.

---

## 6. Variables de entorno

Copiá `.env.example` a `.env.local` y completá lo que necesites.

```bash
cp .env.example .env.local
```

| Variable | Obligatoria | Para qué sirve |
| --- | --- | --- |
| `RESEND_API_KEY` | No | Activa el envío real de correos. Sin ella, el formulario funciona en modo desarrollo. |
| `CONTACT_TO_EMAIL` | No | Destino de las consultas. Por defecto `optifaipartnetship@gmail.com`. |
| `CONTACT_FROM_EMAIL` | No | Remitente. Requiere un dominio verificado en Resend. |
| `NEXT_PUBLIC_SITE_URL` | No en Vercel; sí en otros builds de producción | URL absoluta del sitio. Se usa para canonical, `hreflang`, Open Graph, sitemap y robots. Si falta en Vercel, se usa `VERCEL_PROJECT_PRODUCTION_URL`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Número de WhatsApp en formato internacional. Por defecto `595981507887`. |
| `NEXT_PUBLIC_BOOKING_URL` | No | Enlace para agendar llamadas. Vacío por defecto. |

Las variables `NEXT_PUBLIC_*` se incrustan en el bundle del navegador: **nunca
pongas secretos ahí**. `RESEND_API_KEY` solo se lee en el servidor.

---

## 7. Cómo funciona el formulario en desarrollo

Sin `RESEND_API_KEY`, el endpoint `POST /api/contact`:

1. Valida los datos con el mismo esquema de Zod que usa el cliente.
2. Imprime el contenido de la consulta en la consola del servidor.
3. Responde `{ "ok": true, "mode": "dev" }`.
4. La interfaz muestra **"Enviado en modo desarrollo"**, aclarando explícitamente
   que no se envió ningún correo real.

Esto es deliberado: el formulario nunca simula en silencio un envío exitoso.

---

## 8. Cómo activar Resend (envío real)

1. Creá una cuenta en [resend.com](https://resend.com).
2. Generá una API key en **API Keys** y ponela en `RESEND_API_KEY`.
3. **Mientras no tengas dominio propio**, dejá el remitente de prueba:
   ```
   CONTACT_FROM_EMAIL=OptifAI <onboarding@resend.dev>
   ```
   Con ese remitente Resend solo permite enviar a la casilla con la que
   registraste la cuenta.
4. **Cuando tengas dominio**, agregalo en Resend → **Domains**, cargá los
   registros DNS que te indique (SPF, DKIM y DMARC) y esperá la verificación.
   Después cambiá el remitente:
   ```
   CONTACT_FROM_EMAIL=OptifAI <hola@tudominio.com>
   ```
5. Reiniciá el servidor. A partir de ahí la respuesta pasa a ser
   `{ "ok": true, "mode": "sent" }` y la interfaz muestra el mensaje de éxito
   normal.

---

## 9. Cómo cambiar los datos de contacto

Todo está en **`config/site.ts`**. No hay ningún número ni correo escrito a mano
dentro de los componentes.

```ts
const WHATSAPP_LOCAL = "0981507887";          // se muestra al visitante
const INSTAGRAM_USERNAME = "optifai";         // la URL se arma sola
const CONTACT_EMAIL = "optifaipartnetship@gmail.com";
```

- El número internacional de WhatsApp se toma de `NEXT_PUBLIC_WHATSAPP_NUMBER`,
  con `595981507887` como valor por defecto.
- La URL de Instagram se construye a partir del nombre de usuario.
- El mensaje inicial de WhatsApp se edita en `messages/es.json` y
  `messages/en.json`, en la clave `whatsapp.message`.

---

## 10. Cómo reemplazar el logo

El logo actual es **temporal y basado en texto**. Vive en un solo lugar:
**`components/shared/logo.tsx`**.

Reemplazá el `<span aria-hidden>` que dibuja el cuadrado con la "O" por un
`<Image>` o un SVG inline. Si el logo definitivo ya incluye el nombre, pasá
`showWordmark={false}` donde se usa (header y footer) o eliminá el wordmark del
componente.

También conviene actualizar el favicon:

- `app/icon.svg` — icono de la pestaña del navegador.
- `public/icon.svg` — copia usada por el manifest (mantené ambos iguales).
- `app/manifest.ts` — agregá PNG de 192px y 512px para plataformas que no
  aceptan SVG.

---

## 11. Cómo agregar proyectos

Editá **`data/projects.ts`**.

Las tres entradas actuales están marcadas con `isPlaceholder: true` y la
interfaz las etiqueta visiblemente como **"Ejemplo ilustrativo"**, además de
mostrar un aviso arriba de la grilla. Ningún visitante ve trabajo inventado como
si fuera real.

Para publicar un caso real:

1. Poné el nombre del cliente en `client` (o dejalo vacío si no te autorizó).
2. Guardá una captura en `public/projects/` y apuntá `image` a ella, por ejemplo
   `image: "/projects/acme-panel.png"`. Tamaño recomendado: **1200×800**.
   Mientras `image` sea `null` se dibuja el mockup generado por CSS.
3. Completá `url` y `repository` solo si son públicos.
4. Cambiá `isPlaceholder` a `false`.
5. Escribí los textos en `messages/es.json` y `messages/en.json`, bajo
   `projects.items.<id>` (`name`, `problem`, `solution`).
6. Si tenés un resultado **verificable**, agregalo como clave `result`.

Cuando ninguna entrada quede como placeholder, poné
`siteConfig.pending.projectsArePlaceholder` en `false`.

---

## 12. Cómo agregar testimonios

Editá **`data/testimonials.ts`**. El array está **vacío a propósito**: no hay
testimonios inventados. Mientras esté vacío, la sección muestra un estado
honesto que explica que todavía no se publicaron.

```ts
{
  id: "acme-2026",
  name: "Nombre real",
  role: "Gerente de operaciones",
  company: "Empresa S.A.",
  quote: "Sus palabras textuales, con su autorización.",
  photo: "/images/testimonials/nombre.jpg", // opcional
  relatedProject: "acme-panel",             // opcional
  order: 1,
  isPlaceholder: false,
}
```

Las entradas con `isPlaceholder: true` se muestran con una etiqueta visible
"Testimonio pendiente de reemplazo", para que un borrador nunca pase por real.

---

## 13. Cómo editar traducciones

Todos los textos visibles están en:

- `messages/es.json`
- `messages/en.json`

Ambos archivos tienen exactamente la misma estructura de claves. Si agregás una
clave en uno, agregala en el otro.

Los mensajes de validación del formulario también son claves de traducción: el
esquema de Zod (`lib/contact-schema.ts`) devuelve identificadores como
`validation.nameMin`, que se resuelven en el idioma activo tanto en el cliente
como cuando el servidor rechaza un envío.

---

## 14. Cómo configurar el enlace para agendar llamadas

Actualmente **no hay enlace de agenda**, y no se inventó ninguno.

Mientras `NEXT_PUBLIC_BOOKING_URL` esté vacío, los botones "Agendar una llamada"
hacen scroll al formulario, precargan el mensaje con la intención de agendar y
mueven el foco al campo de texto.

Cuando tengas la agenda:

```bash
NEXT_PUBLIC_BOOKING_URL=https://cal.com/optifai/30min
```

A partir de ahí los mismos botones abren ese enlace en una pestaña nueva. No hay
que tocar código: la lógica está en `components/shared/booking-cta.tsx`.

Funciona con Calendly, Cal.com, TidyCal o cualquier URL pública.

---

## 15. Lint, typecheck y build

```bash
npm run lint       # ESLint (incluye reglas de React Compiler)
npm run typecheck  # tsc --noEmit
npm run build      # build de producción
```

Los tres deben pasar sin errores antes de desplegar.

---

## 16. Cómo desplegar en Vercel

1. Subí el proyecto a GitHub:
   ```bash
   git add .
   git commit -m "Prepare OptifAI landing for deployment"
   git remote add origin https://github.com/optifai/landing-optifai.git
   git push -u origin <rama-actual>
   ```
   Si `origin` ya existe, verificá primero `git remote -v` y corregilo con
   `git remote set-url origin https://github.com/optifai/landing-optifai.git`.
   Nunca uses `--force` para integrar un repositorio que ya tenga historial.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el
   repositorio `optifai/landing-optifai`. Vercel detecta Next.js automáticamente;
   dejá el preset **Next.js**, el comando `npm run build` y el directorio de
   salida administrado por Vercel.
3. En **Settings → Environment Variables**, dejá activada la opción
   **Automatically expose System Environment Variables**. Así la URL canónica
   puede usar `VERCEL_PROJECT_PRODUCTION_URL`.
4. Para una demo no hace falta cargar variables propias: el formulario informa
   que no envió correo. Para habilitar correo real, cargá:
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` si ya querés
     recibir correos.
   Cuando exista un dominio definitivo, agregá también `NEXT_PUBLIC_SITE_URL`
   con la URL absoluta, sin barra final.
5. **Deploy**.
6. Después de cambiar variables de entorno hay que **volver a desplegar**: los
   valores `NEXT_PUBLIC_*` se incrustan en tiempo de build.

### Despliegue de prueba (Preview)

1. Importá el repositorio en Vercel y desplegá la rama actual, sin variables de
   correo. Los pushes posteriores y los pull requests generarán Preview
   Deployments independientes.
2. Confirmá en el log de Vercel que `npm run build` termina correctamente.
3. Abrí la URL de Preview y verificá `/`, `/es`, `/en`, `/robots.txt`,
   `/sitemap.xml` y `/manifest.webmanifest`.
4. Enviá una consulta de prueba. Sin `RESEND_API_KEY`, la interfaz debe indicar
   explícitamente el modo demo y no debe enviarse ningún correo.
5. Revisá en el HTML que canonical, `hreflang` y Open Graph usen HTTPS y no
   `localhost`. Guardá la URL del Preview en el pull request o registro de QA.
6. Recién después de validar la demo, configurá Resend y el dominio definitivo
   en el entorno **Production** y promové o redeployá el commit aprobado.

---

## 17. Cómo conectar un dominio después

1. En Vercel → **Settings → Domains** → agregá el dominio.
2. Cargá los registros DNS que indique Vercel en tu proveedor.
3. Actualizá `NEXT_PUBLIC_SITE_URL` con el dominio definitivo y volvé a
   desplegar (si no, canonical, `hreflang` y sitemap seguirán apuntando al
   dominio anterior).
4. Verificá el dominio también en Resend para poder enviar desde una casilla
   propia (ver punto 8).
5. Revisá que `https://tudominio.com/sitemap.xml` y `/robots.txt` respondan bien
   y enviá el sitemap a Google Search Console.

---

## 18. Pendientes antes de producción

Contenido temporal que hay que reemplazar:

- [ ] **Logo definitivo** (`components/shared/logo.tsx`, `app/icon.svg`,
      `public/icon.svg`).
- [ ] **Proyectos reales** — las tres fichas actuales son ejemplos ilustrativos
      etiquetados como tales (`data/projects.ts`).
- [ ] **Testimonios** — el array está vacío a propósito
      (`data/testimonials.ts`).
- [ ] **Enlace de agenda** (`NEXT_PUBLIC_BOOKING_URL`).
- [ ] **Dominio y `NEXT_PUBLIC_SITE_URL`**.
- [ ] **Dominio verificado en Resend** y `CONTACT_FROM_EMAIL` propio.

Revisiones recomendadas:

- [ ] **Textos legales** — `messages/*.json`, bajo `legal.privacy` y
      `legal.terms`. Son un borrador prudente y el propio sitio lo advierte;
      deben ser revisados por un profesional antes de publicar. Actualizá
      también `LEGAL_LAST_UPDATED` en `config/site.ts`.
- [ ] **Datos verificables** — `siteConfig.facts` (años de experiencia, tamaño
      del equipo) está en `null` a propósito. Si lo completás, se muestra; si no,
      no se afirma nada.
- [ ] **Rate limiting o CAPTCHA** en `app/api/contact/route.ts`. Hoy hay
      honeypot, validación en servidor y límites de longitud. Si aparece spam,
      el lugar para agregar un contador (Upstash, Vercel KV) está marcado con un
      comentario al inicio del archivo.
- [ ] **Lighthouse en producción** — medir sobre el dominio real, no en local.

---

## Estructura del proyecto

```
app/
  [locale]/
    layout.tsx            # <html>, fuentes, providers, header/footer
    page.tsx              # landing (todas las secciones)
    privacy/ terms/       # páginas legales
    not-found.tsx
    opengraph-image.tsx   # imagen social generada por idioma
  api/contact/route.ts    # endpoint del formulario
  globals.css             # tokens de diseño + utilidades
  sitemap.ts robots.ts manifest.ts icon.svg
components/
  layout/                 # header, footer, menú móvil, selectores
  sections/               # una sección de la landing por archivo
  forms/                  # formulario de contacto y campos
  shared/                 # logo, WhatsApp, JSON-LD, iconos de marca
  ui/                     # botón, card, section, reveal
config/site.ts            # datos de negocio editables
data/                     # servicios, proyectos, testimonios, FAQ, etc.
i18n/                     # routing, request y navegación de next-intl
lib/                      # esquema del formulario, metadatos, utilidades
messages/                 # es.json / en.json
types/                    # tipos compartidos
proxy.ts                  # routing de idioma (antes middleware.ts)
```

---

## Notas de accesibilidad y rendimiento

- Objetivo **WCAG 2.2 AA**. Auditado con axe-core en ambos temas, ambos idiomas
  y en móvil y escritorio: **0 violaciones**.
- Navegación completa por teclado. El menú móvil es un diálogo modal con foco
  atrapado, cierre con `Escape` y retorno del foco al botón que lo abrió.
- Las preguntas frecuentes usan `<details>`/`<summary>` nativos: sin JavaScript
  y con soporte de teclado del navegador.
- Se respeta `prefers-reduced-motion`: las animaciones de entrada se desactivan
  por completo y el scroll suave pasa a instantáneo.
- Sin scroll horizontal, verificado en 320, 375, 768, 1024 y 1440 px.
- Componentes de servidor por defecto; solo son de cliente los que necesitan
  estado o eventos.
- Fuentes autoalojadas con `next/font`. Sin imágenes remotas ni peticiones a
  terceros.
