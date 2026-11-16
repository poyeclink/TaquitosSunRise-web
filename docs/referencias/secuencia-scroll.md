# Secuencia de scroll del home

La sección "The homemade way" del home (`src/presentation/components/home/scroll-sequence.tsx`) muestra una secuencia 3D que avanza y retrocede con el scroll: un huevo flota, se parte, la yema y la clara caen a un sartén y terminan como huevo estrellado visto desde arriba (la yema como "sol"). Referencia del cliente: un sitio de café donde los granos se parten y se sirven al hacer scroll.

## De dónde sale

Todo está modelado y animado en Blender, sin assets de terceros:

- **Archivo fuente:** `docs/referencias/secuencia-huevo.blend` (Blender 5.3, motor Cycles).
- **Escena:** cáscara en dos mitades, yema, clara (metaballs que pasan de transparente a blanca con el valor `Coccion` del material `Clara`), sartén con mango, tres luces de área y un piso que solo atrapa sombras.
- **Fondo:** blanco puro, igual que la sección. Por eso los bordes de la imagen no se notan en la página.
- **Duración:** 144 frames a 1600 × 900.

## Dónde están los frames

`public/secuencias/huevo/{lg,sm}/001.webp … 144.webp`

| Tamaño | Medida | Uso |
|---|---|---|
| `lg` | 1600 × 900 (cuadro completo) | Pantallas apaisadas desde 768 px de ancho |
| `sm` | 800 × 720 (recorte central) | Móvil y pantallas verticales |

La cantidad de frames, las medidas y los textos de los capítulos están en `sequence`, dentro de `src/presentation/components/home/home-content.ts`.

## Cómo volver a renderizar

1. Abre `secuencia-huevo.blend`, haz los cambios y guarda.
2. Renderiza la animación a PNG (en Blender: *Procesar → Procesar animación*), o desde la terminal:

```bash
blender -b docs/referencias/secuencia-huevo.blend -o "//render/####" -F PNG -a
```

3. Convierte los PNG a WebP en los dos tamaños. El recorte `sm` toma el centro del cuadro (1000 × 900) y lo reduce a 800 × 720. Con [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i docs/referencias/render/%04d.png -c:v libwebp -quality 82 -start_number 1 public/secuencias/huevo/lg/%03d.webp
```

```bash
ffmpeg -i docs/referencias/render/%04d.png -vf "crop=1000:900,scale=800:720" -c:v libwebp -quality 80 -start_number 1 public/secuencias/huevo/sm/%03d.webp
```

4. Si cambia la cantidad de frames o las medidas, actualiza `sequence.frames`.

No subas la carpeta `render/` al repo: los PNG pesan mucho más que los WebP.

## Pendiente

- El copy de los capítulos es una propuesta basada en la guía de voz: falta validarlo con el cliente (`docs/brand/05-pendientes.md`).
