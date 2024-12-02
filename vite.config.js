<<<<<<< Updated upstream
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import path from 'path';
>>>>>>> Stashed changes

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), glsl()],
<<<<<<< Updated upstream
})
=======
    build: {
        minify: false, // Disable minification for debugging
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'three',
                '@react-three/fiber',
                '@react-three/drei',
                '@react-three/postprocessing',
                '@react-three/rapier',
            ],
            input: {
                index: './index.html', // Main entry file
            },
            output: {
                entryFileNames: `js/solar/solar.js`, // Main application logic
                chunkFileNames: (chunkInfo) => {
                    console.log(`Processing chunk: ${chunkInfo.name}`);

                    // Specific chunk matching for libraries
                    if (chunkInfo.name === 'react') return 'js/solar/depends/react.js';
                    if (chunkInfo.name === 'react-dom') return 'js/solar/depends/react-dom.js';
                    if (chunkInfo.name === 'three') return 'js/solar/depends/three.js';
                    if (chunkInfo.name.includes('react-three')) return 'js/solar/depends/react-three.js';

                    // Default fallback for other vendor libraries
                    return 'js/solar/vendor/[name].js';
                },
                assetFileNames: ({ name, type }) => {
                    console.log(`Processing asset: ${name}, type: ${type}`);

                    // Separate CSS into its own folder
                    if (name && name.endsWith('.css')) {
                        return 'css/solar.css';
                    }

                    // Place images and other assets appropriately
                    if (type === 'image') {
                        return 'js/solar/textures/[name][extname]';
                    }

                    // Default asset handling
                    return `${type}/[name][extname]`;
                },
                manualChunks(id) {
                    console.log(`Analyzing module ID for chunking: ${id}`);

                    if (id.includes('node_modules')) {
                        // Extract the folder name from the full path
                        const packageName = id.split('node_modules/')[1].split('/')[0];
                        console.log(`Matched package: ${packageName}`);

                        // Create a chunk for each library by its folder name
                        if (packageName === 'react') return 'react';
                        if (packageName === 'react-dom') return 'react-dom';
                        if (packageName === 'three') return 'three';
                        if (packageName.startsWith('@react-three')) return 'react-three';

                        // Default fallback for other node_modules
                        return 'vendor';
                    }

                    // Default fallback for other files
                    return 'solar';
                },
            },
        },
    },
});
>>>>>>> Stashed changes
