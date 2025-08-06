import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // The 'base' option is configured for deploying to the root of a domain.
  // For platforms like Railway, Vercel, or a custom domain, this should be '/'.
  // If you were deploying to GitHub Pages, you would set it to '/<your-repo-name>/'.
  base: '/',
  plugins: [react()],
})