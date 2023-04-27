import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

// websocket changes SOURCE: https://vitejs.dev/config/server-options.html#server-hmr

export default defineConfig({
  root: '.',
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  server: {
    port: 4200,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 24678,
      clientPort: 24678,
      overlay: false,
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './server/index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
    }),
  ],
})
