# EverywhereMarket 🛒✨

EverywhereMarket es una plataforma de comercio electrónico de última generación inspirada en Mercado Libre, con arquitectura de subdominio temático para ofertas especiales (`halloween.everywheremarket.com`).

---

## 🚀 Despliegue en Vercel (Paso a Paso)

El proyecto ya está completamente configurado y optimizado para **Vercel**.

### Opción 1: Despliegue desde GitHub (Recomendado)

1. Sube tu proyecto a un repositorio de **GitHub**, **GitLab** o **Bitbucket**:
   ```bash
   git add .
   git commit -m "feat: preparar EverywhereMarket para Vercel"
   git push origin main
   ```
2. Entra a [Vercel](https://vercel.com/) e inicia sesión.
3. Haz clic en **"Add New..."** > **"Project"**.
4. Selecciona tu repositorio e impórtalo.
5. Vercel detectará automáticamente la configuración gracias al archivo `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Haz clic en **Deploy**. ¡Tu marketplace estará en línea en segundos!

---

### Opción 2: Despliegue directo mediante Vercel CLI

Si prefieres desplegar desde tu terminal:

1. Instala la CLI oficial de Vercel (si aún no la tienes):
   ```bash
   npm install -g vercel
   ```
2. Inicia sesión en tu cuenta de Vercel:
   ```bash
   vercel login
   ```
3. En la raíz del proyecto, ejecuta para un despliegue de vista previa:
   ```bash
   vercel
   ```
4. Para desplegar directamente a producción:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Archivo de Configuración de Vercel (`vercel.json`)

El archivo `vercel.json` incluido en el proyecto garantiza:
- **Enrutamiento SPA**: Redirige todas las rutas al `index.html` para evitar errores 404 al recargar la página o al navegar por subdominios/rutas.
- **Cabeceras de Caché Inmutable**: Los assets en `/assets/*` se sirven con `Cache-Control: public, max-age=31536000, immutable` para máxima velocidad en la CDN de Vercel.
- **Cabeceras de Seguridad**: Incluye protecciones contra clickjacking y MIME sniffing (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`).

---

## 🛠️ Comandos de Desarrollo Local

- **Instalar dependencias**:
  ```bash
  npm install
  ```
- **Iniciar servidor de desarrollo**:
  ```bash
  npm run dev
  ```
- **Compilar para producción**:
  ```bash
  npm run build
  ```
- **Previsualizar compilación local**:
  ```bash
  npm run preview
  ```
- **Verificación de tipos TypeScript**:
  ```bash
  npm run lint
  ```

---

## 🎃 Características Incluidas

- **Simulación de Subdominio en Vivo**: Navegación fluida entre `everywheremarket.com` y `halloween.everywheremarket.com` mediante selector de dominio y hashes/URL state.
- **Envíos FULL 24h & Compra Protegida**: Badge FULL, cálculo de cuotas sin interés y garantía de devolución.
- **Carrito de Compras con Envío Gratis**: Barra de progreso hacia envío gratis y sistema de cupones (`SPOOKY30`, `HALLOWEEN2026`).
- **Calabaza Misteriosa Interactiva**: Sonido sintetizado con Web Audio API y revelación de descuentos especiales.
- **Checkout Completo**: Formulario de envío y selección de medios de pago (tarjeta, EverywherePay, efectivo) con generación de recibo de compra y código de seguimiento.
- **Publicación de Artículos**: Modal para publicar nuevos productos en el catálogo.
