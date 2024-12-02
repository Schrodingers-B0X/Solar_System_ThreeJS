import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [react(), glsl()],
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
                entryFileNames: `js/solar/solar.js`,
                chunkFileNames: (chunkInfo) => {
                    console.log(`Processing chunk:`, chunkInfo.name);
                    if (chunkInfo.name === 'react-three') {
                        console.log(`Chunk matched react-three: ${chunkInfo.name}`);
                        return 'js/solar/depends/react-three.js';
                    } else if (chunkInfo.name === 'react-dom') {
                        console.log(`Chunk matched react-dom: ${chunkInfo.name}`);
                        return 'js/solar/depends/react-dom.js';
                    } else if (chunkInfo.name === 'three') {
                        console.log(`Chunk matched three: ${chunkInfo.name}`);
                        return 'js/solar/depends/three.js';
                    } else if (
                        chunkInfo.name.includes('fiber') ||
                        chunkInfo.name.includes('drei') ||
                        chunkInfo.name.includes('postprocessing') ||
                        chunkInfo.name.includes('rapier')
                    ) {
                        console.log(`Chunk matched react-three libraries: ${chunkInfo.name}`);
                        return 'js/solar/depends/react-three.js';
                    }
                    console.log(`Chunk fell to default: ${chunkInfo.name}`);
                    return 'js/solar/vendor/[name].js';
                },
                assetFileNames: ({ name, type }) => {
                    console.log(`Processing asset:`, { name, type });
                    if (name && name.endsWith('.css')) {
                        console.log(`Asset matched CSS: ${name}`);
                        return 'css/solar.css';
                    } else if (type === 'image') {
                        console.log(`Asset matched image: ${name}`);
                        return 'js/solar/textures/[name][extname]';
                    }
                    console.log(`Asset fell to default: ${name}`);
                    return `${type}/[name][extname]`;
                },
                manualChunks(id) {
                    console.log(`Analyzing module ID for chunking:`, id);
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) {
                            if (id.includes('react-dom')) {
                                console.log(`Module matched react-dom: ${id}`);
                                return 'react-dom';
                            }
                            console.log(`Module matched react: ${id}`);
                            return 'react';
                        }
                        if (id.includes('three')) {
                            console.log(`Module matched three: ${id}`);
                            return 'three';
                        }
                        if (
                            id.includes('@react-three/fiber') ||
                            id.includes('@react-three/drei') ||
                            id.includes('@react-three/postprocessing') ||
                            id.includes('@react-three/rapier')
                        ) {
                            console.log(`Module matched react-three libraries: ${id}`);
                            return 'react-three';
                        }
                    }
                    console.log(`Module fell to default vendor: ${id}`);
                    return 'vendor';
                },
            },
        },
    },
});
