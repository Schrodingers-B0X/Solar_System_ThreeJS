import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [react(), glsl()],
    build: {
        minify: false,  // Disable minification
        rollupOptions: {
            input: {
                index: './index.html',  // Correct the path as necessary
            },
            output: {
                entryFileNames: `js/solar/solar.js`,
                chunkFileNames: (chunkInfo) => {
                    // Explicit naming based on chunk dependencies
                    if (chunkInfo.name.startsWith('react') || chunkInfo.name.includes('fiber')) {
                        return 'js/solar/depends/react.js';
                    } else if (chunkInfo.name.includes('three')) {
                        return 'js/solar/depends/three.js';
                    }
                    return `js/solar/solar.js`;
                },
                assetFileNames: ({ name, type }) => {
                    if (name.endsWith('.css')) {
                        // Use the original name for CSS files
                        return `css/solar.css`;
                    }
				return `${type}/${name}`;
                },

				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('react') || id.includes('react-dom')) {
							return 'react';
						} else if (id.includes('three')) {
							return 'three';
						} else if (
							id.includes('@react-three/fiber') ||
							id.includes('@react-three/drei') ||
							id.includes('@react-three/postprocessing') ||
							id.includes('@react-three/rapier')
						) {
							return 'react-three';
						}
					}
					return 'vendor';
				}
            },
        },
    },
});
