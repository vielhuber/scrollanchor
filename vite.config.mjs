import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        rolldownOptions: {
            input: './script.js',
            output: {
                entryFileNames: 'script.min.js',
                format: 'iife'
            }
        },
        sourcemap: 'inline',
        emptyOutDir: false
    }
});
