import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import terser from '@rollup/plugin-terser'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import * as packageJson from './package.json'

// Keep React and React DOM (including their subpath imports) external
// so the consuming app provides a single runtime compatible with 18/19.
// This avoids bundling local React internals like react/jsx-runtime.
const peerDependencies = Object.keys(packageJson.peerDependencies)
const externalPackages = [...peerDependencies, ...Object.keys(packageJson.devDependencies)]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        tsConfigPaths(),
        dts({
            insertTypesEntry: true,
            exclude: ['node_modules/**/*', 'src/stories/**', 'src/**/*.stories.tsx', 'src/components/**/makeData.ts'],
        }),
        cssInjectedByJsPlugin(),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'asmaDocViewer',
            formats: ['es'],
            fileName: (format) => `asmaDocViewer.${format}.js`,
        },
        rollupOptions: {
            external: (id) => externalPackages.includes(id) || id.startsWith('react/') || id.startsWith('react-dom/'),
            output: {
                globals: {
                    react: 'React',
                    'react/jsx-runtime': 'react/jsx-runtime',
                    'react-dom': 'ReactDOM',
                },
                plugins: [terser()],
            },
        },
    },
})
