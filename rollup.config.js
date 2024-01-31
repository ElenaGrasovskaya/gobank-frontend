import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';

const  production = false;

export default {
  input: 'src/main.ts', // Your TypeScript entry file
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      // Enable TypeScript in Svelte components
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // Enable run-time checks in development mode
        dev: !production
      }
    }),
    // Resolve bare module specifiers to relative paths
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    // Other plugins you might be using, like CSS, Terser, etc.
  ],
  watch: {
    clearScreen: false
  }
};
