# 05 · Pendientes y decisiones abiertas

Estos puntos se validan con el cliente o el diseñador antes de usarlos en producción.

## Licencias

- [ ] **Brownist:** uso comercial vía Creative Fabrica. Confirmar que hay licencia (en la web solo se usa dentro del logo SVG).
- [ ] **LosLana Niu Pro:** Adobe Fonts. Si se quiere en titulares web, se necesita un kit web de Adobe Fonts.
- [ ] **Fotos de stock del guideline:** el paquete no incluye 6 imágenes (Familia cocina, Obrero, Medical personal, Familia abrazo 2, Familia americana, Screenshot). Confirmar origen y licencia antes de usar fotos similares.
- [ ] **Tarjetas de los círculos del hero:** el texto de cada ingrediente (taco, aguacate, huevo, chile, limón) y del sello es una propuesta según la guía de voz (`hero.orbit` y `hero.sealReveal` en `home-content.ts`). Validarlo con el cliente.
- [ ] **Secuencia de scroll del home:** es un render 3D propio hecho en Blender (ver `docs/referencias/secuencia-scroll.md`). Validar con el cliente el copy de los capítulos y si quiere más secuencias (tortilla, taquito).
- [ ] **Imagen generada con IA:** `ChatGPT Image 20 ago 2026` está dentro de los mockups. Confirmar si se puede usar públicamente.

## Contenido del negocio (no inventar)

- [ ] Ubicación o ubicaciones, horarios, teléfonos y redes sociales.
- [ ] Menú y precios: vendrán de Toast POS.
- [ ] Dominio definitivo: el guideline muestra `www.sunrisetaquitos.com` como ejemplo; confirmar.
- [ ] Idioma o idiomas del sitio (EN / ES / bilingüe).
- [ ] Detalles del servicio de catering (menú, mínimo de personas, anticipación): la página `/contacto` muestra un TODO.
- [ ] **Formulario de contacto:** a dónde llegan los mensajes (correo, CRM o Toast). Hoy `UnconfiguredContactInbox` responde "no disponible" y la página ofrece llamar o visitar; no se pierde ningún mensaje en silencio. Al conectarlo: nuevo adaptador en `src/infrastructure/contact/`, credenciales en variables de entorno y cambio en `di/container.ts`.
- [ ] **Página "Nosotros" (`/nosotros`):** hitos de la línea de tiempo (año, título, texto y foto; hoy solo está la fundación en 1988), e historia y foto de los fundadores. Se cargan en `static-restaurant-repository.ts` (`milestones`, `foundersStory`). Mientras tanto, los hitos y los fundadores usan fotos actuales del negocio como provisionales (`timeline.photos` y `founders.photo` en `about-content.ts`); reemplazarlas cuando lleguen las reales.

## Integración con Toast POS

- [ ] Acceso a la API de Toast: credenciales del restaurante (client ID / secret, GUID) o registro como integración. Primero en sandbox.
- [ ] Confirmar qué se administra desde el sitio y qué sigue en Toast (precios, disponibilidad, fotos, descripciones).
- [ ] Alcance de órdenes en línea: pickup, delivery, catering; cómo se cobra.

## Assets

- [ ] `sello-est-1988` solo existe en blanco, negro y rojo; no hay versión full-color ni gris.
- [ ] Los PNG de `logos/png/` son de 504 × 504 px. Para Open Graph o redes conviene exportarlos de nuevo en mayor tamaño.
- [ ] El paquete del guideline marca la fuente AlbertSans como faltante. Confirmar si se usa en algo.

## Ya resuelto

- Fotos temporales de Unsplash reemplazadas por fotografía propia del negocio (`src/presentation/media/photos.ts`).
- Colores de los SVG cambiados al hex oficial (`#bb162c` → `#bb0d2f`, `#444343` → `#3f4443`, `#3b927c` → `#2ea589`).
- Nombres de archivo en kebab-case y frases nombradas según su texto real.
- `viewBox` de logos y frases recortado al contenido.
