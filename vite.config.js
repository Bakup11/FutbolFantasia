import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🔑 Añadir 'base: /' para asegurar que Vite resuelva correctamente
  // las rutas de los assets y módulos en entornos remotos/Codespaces.
  base: '/',
})