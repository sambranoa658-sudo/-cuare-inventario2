# Cuare Limitada · Inventario

App web para el inventario de equipos tecnológicos usados de Cuare Limitada.

## Qué hace
- Registro de productos por categoría (impresoras, monitores, tóner, cartuchos y categorías nuevas)
- Entradas y salidas con historial y stock actualizado
- Código QR por equipo, hoja de etiquetas para imprimir y escaneo con la cámara del celular
- Exportación a Excel (impresoras buenas y con problemas en hojas separadas)
- Estante (A, B, C…), precio usado y precio nuevo de mercado

## Archivos
- `index.html`: la app completa
- `modo-local.js`: guarda los datos en el navegador cuando la app corre fuera de Claude (por ejemplo, en Vercel)

## Publicar en Vercel
1. En Vercel: **Add New → Project** y elige este repositorio.
2. Framework Preset: **Other**. No necesita comando de build.
3. **Deploy**.

## Importante sobre los datos
En Vercel, los datos se guardan **en cada dispositivo** (en el navegador). Lo que registra un teléfono no lo ve otro.
Para que todo el equipo comparta el mismo inventario hace falta conectar una base de datos en línea (por ejemplo Firebase o Supabase).
