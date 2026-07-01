# Logos de Marcas para la Calculadora

Para personalizar los logotipos de las marcas y utilizar imágenes reales de alta resolución (SVG, PNG, JPG, WebP) en lugar de los vectores integrados, simplemente coloca los archivos de imagen dentro de esta carpeta con los siguientes nombres:

## Nombres de Archivos Requeridos

- **Ualá Bis**: `uala.svg` (o `.png`)
- **Mercado Pago**: `mercadopago.svg` (o `.png`)
- **Zettle / PayPal**: `zettle.svg` (o `.png`)
- **Clip**: `clip.svg` (o `.png`)
- **NetPay**: `netpay.svg` (o `.png`)
- **Sr. Pago**: `srpago.svg` (o `.png`)
- **Billpocket**: `billpocket.svg` (o `.png`)
- **Nu México**: `nu.svg` (o `.png`)
- **Banorte**: `banorte.svg` (o `.png`)
- **DiDi Pay**: `didi.svg` (o `.png`)
- **Plata Card**: `plata.svg` (o `.png`)
- **BBVA**: `bbva.svg` (o `.png`)
- **Santander Getnet**: `getnet.svg` (o `.png`)

## ¿Por qué este enfoque es mejor?

1. **Rendimiento e Independencia**: No dependes de servidores externos o conexiones a APIs de terceros que puedan caerse, bloquear peticiones por CORS o alentar la carga del sitio.
2. **Cero saltos de diseño (CLS)**: El navegador carga y procesa los assets de forma local ultra-rápida.
3. **Respaldo Inteligente (Fallback)**: Si no agregas un archivo o si la imagen tiene algún error de carga, la calculadora de forma inteligente renderizará instantáneamente un diseño vectorial en SVG con los colores y la tipografía exacta de la marca para que la interfaz nunca se vea rota.
