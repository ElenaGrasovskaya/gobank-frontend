/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sansSerif:['Raleway', 'sans-serif'],
        monoSpace:['Source Code Pro', 'monospace']
      }
    },
  },
  plugins: [],
}

