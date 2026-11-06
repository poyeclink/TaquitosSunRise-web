# 02 · Identidad visual

## Logotipo

El **isotipo** es un personaje que reúne cuatro elementos:

| Elemento | Representa |
|---|---|
| Sol / amanecer | Nuevos comienzos |
| Sombrero | Tradición |
| Personaje | Calidez |
| Taquito | El sabor que se comparte |

En el **logotipo**, "Sunrise" y "Taquitos" rodean al isotipo y forman una sola unidad.

| Versión | Archivo | Uso |
|---|---|---|
| Principal | `logo-principal-*.svg` | Uso por defecto |
| Con tagline | `logo-tagline-*.svg` | Con "The homemade way" |
| Con establecido | `logo-est-1988-*.svg` | Principal + "EST. 1988" |
| Sello establecido | `sello-est-1988-*.svg` | Horizontal compacto: isotipo + "EST. 1988" |
| Isotipo | `isotipo-*.svg` | Espacios reducidos, favicon, avatar |

**Variantes de color y cuándo usarlas:**

| Variante | Fondo | Nota |
|---|---|---|
| `full-color` | Claro | — |
| `blanco` | Crimson, Aqua u oscuro | — |
| `rojo` | Claro | Monocromática |
| `negro`, `gris` | — | Escala de grises; usos técnicos |

**Reglas:**
- Área libre: el espacio "x" definido en el guideline se deja libre alrededor del logo.
- Tamaño mínimo: **2 cm / 75.6 px**.
- Los SVG del repo tienen el `viewBox` recortado al contenido. El área libre se maneja con CSS (padding o margin), no con espacio dentro del archivo.

## Paleta

| Nombre | Hex | RGB | CMYK | Pantone | Rol |
|---|---|---|---|---|---|
| Crimson Red | `#bb0d2f` | 187, 13, 47 | 18, 100, 87, 9 | 200 C | Primario, protagonista |
| Charcoal | `#3f4443` | 63, 68, 67 | 69, 58, 60, 44 | 446 C | Primario; contraste y texto |
| Aqua Sunrise | `#2ea589` | 46, 165, 137 | 79, 13, 59, 0 | 3435 C | Secundario: acento, en menor proporción |

> Los SVG originales usaban `#bb162c`, `#444343` y `#3b927c`. En las copias de `brand-assets/` ya se cambiaron a los valores oficiales de esta tabla.

### Contraste (WCAG)

| Combinación | Ratio | Uso permitido |
|---|---|---|
| Charcoal sobre blanco | 9.91:1 | Cualquier texto |
| Crimson sobre blanco / blanco sobre Crimson | 6.54:1 | Cualquier texto |
| Aqua sobre blanco | 3.06:1 | Solo texto grande (≥ 24 px, o 18.66 px en bold) y elementos gráficos |
| Aqua sobre Charcoal | 3.24:1 | Solo texto grande |
| Crimson sobre Charcoal | 1.52:1 | **No usar** para texto |
| Crimson sobre Aqua | 2.14:1 | **No usar** para texto |

## Tipografía

| Rol | Fuente | Uso en web |
|---|---|---|
| Logo "Sunrise" | Brownist (handwriting orgánico) | No se carga: el logo va en SVG |
| Logo "Taquitos" | LosLana Niu Pro | Opcional para titulares de acento, si hay licencia (ver `brand-assets/fonts/`) |
| Uso diario | **League Spartan** | Toda la interfaz |

**Jerarquía:**

| Elemento | Peso | Tamaño |
|---|---|---|
| `h1` | Bold | ≥ 300 % del cuerpo |
| `h2` | Medium | 200 % del cuerpo |
| `p` | Regular | Base |
| Pie de nota | Bold | — |

## Iconografía

Son 26 íconos de inspiración gastronómica Tex-Mex. Comparten estas características:

- trazo uniforme (referencia: 10 pt)
- curvas orgánicas
- textura sutil con pocos puntos
- terminaciones redondeadas
- "trazos explosivos" inspirados en la gráfica popular mexicana para los rayos del sol

**Color:** Crimson con acentos Aqua.

## Textura

`texturas/textura-crimson.svg`: patrón en Crimson para fondos y bloques de color.

## Brand statements

Son lettering diseñado: tipografía primaria y secundaria combinadas con iconografía. Se usan como imagen, no se recrean con texto. Ver `03-voz-y-mensajes.md`.
