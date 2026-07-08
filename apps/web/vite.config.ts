import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // must come before react() per TanStack's docs
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
})
