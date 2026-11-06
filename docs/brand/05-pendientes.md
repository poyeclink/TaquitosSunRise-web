# 05 · Pendientes y decisiones abiertas

Estos puntos se validan con el cliente o el diseñador antes de usarlos en producción.

## Licencias

- [ ] **Brownist:** uso comercial vía Creative Fabrica. Confirmar que hay licencia (en la web solo se usa dentro del logo SVG).
- [ ] **LosLana Niu Pro:** Adobe Fonts. Si se quiere en titulares web, se necesita un kit web de Adobe Fonts.
- [ ] **Fotos de stock del guideline:** el paquete no incluye 6 imágenes (Familia cocina, Obrero, Medical personal, Familia abrazo 2, Familia americana, Screenshot). Confirmar origen y licencia antes de usar fotos similares.
- [ ] **Fotografía propia:** el home usa fotos temporales de Unsplash (ver `docs/referencias/fotos-unsplash.md`). Reemplazarlas por fotos reales del restaurante, la comida y el equipo.
- [ ] **Imagen generada con IA:** `ChatGPT Image 20 ago 2026` está dentro de los mockups. Confirmar si se puede usar públicamente.

## Contenido del negocio (no inventar)

- [ ] Ubicación o ubicaciones, horarios, teléfonos y redes sociales.
- [ ] Menú y precios: vendrán de Toast POS.
- [ ] Dominio definitivo: el guideline muestra `www.sunrisetaquitos.com` como ejemplo; confirmar.
- [ ] Idioma o idiomas del sitio (EN / ES / bilingüe).
- [ ] Detalles del servicio de catering.

## Integración con Toast POS

- [ ] Acceso a la API de Toast: credenciales del restaurante (client ID / secret, GUID) o registro como integración. Primero en sandbox.
- [ ] Confirmar qué se administra desde el sitio y qué sigue en Toast (precios, disponibilidad, fotos, descripciones).
- [ ] Alcance de órdenes en línea: pickup, delivery, catering; cómo se cobra.

## Assets

- [ ] `sello-est-1988` solo existe en blanco, negro y rojo; no hay versión full-color ni gris.
- [ ] Los PNG de `logos/png/` son de 504 × 504 px. Para Open Graph o redes conviene exportarlos de nuevo en mayor tamaño.
- [ ] El paquete del guideline marca la fuente AlbertSans como faltante. Confirmar si se usa en algo.

## Ya resuelto

- Colores de los SVG cambiados al hex oficial (`#bb162c` → `#bb0d2f`, `#444343` → `#3f4443`, `#3b927c` → `#2ea589`).
- Nombres de archivo en kebab-case y frases nombradas según su texto real.
- `viewBox` de logos y frases recortado al contenido.
