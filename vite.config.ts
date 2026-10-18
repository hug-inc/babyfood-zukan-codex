/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Codex版はClaude版と分離したGitHub Pages用サブパスで配信する
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/babyfood-zukan-codex/' : '/',
  plugins: [react()],
  test: { environment: 'node' },
}))
