import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const previewCsp = [
  "default-src 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://localhost:5443",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

export default defineConfig({
  plugins: [react()],
  preview: {
    host: 'localhost',
    port: 4173,
    strictPort: true,
    headers: {
      'Content-Security-Policy': previewCsp,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'X-Frame-Options': 'DENY',
    },
  },
})
