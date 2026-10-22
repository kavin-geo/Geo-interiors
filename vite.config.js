import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Geo-interiors/',
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // Add this block for your standard local dev server
  server: {
    allowedHosts: [
      '.ngrok-free.app'
    ],
  },
  // Keeps your preview settings working if you run `vite preview`
  preview: {
    allowedHosts: [
      'all'
    ],
  },
})
