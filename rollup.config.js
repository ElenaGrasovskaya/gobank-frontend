import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';

const production = false;

export default {
  input: 'src/main.ts', // Your TypeScript entry file
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    replace({
      // stringify the object       
      __myapp: JSON.stringify({
        env: {
          isProd: production,
          ...config().parsed // attached the .env config
        }
      }),
    }),
    svelte({
      // Enable TypeScript in Svelte components
      preprocess: sveltePreprocess({
        // 👇 Add this attribute
        replace: [["process.env.API_URL", process.env.API_URL]],
      }),
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
