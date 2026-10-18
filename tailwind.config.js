/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FFFDF8', 100: '#FFF8EC', 200: '#FDEFD8' },
        brand: { 50: '#FFF3E8', 100: '#FFE2C7', 200: '#FFC994', 400: '#FB9A45', 500: '#F27B1F', 600: '#D9640D', 700: '#B04F0A' },
        leaf: { 50: '#F1F8EE', 100: '#E1F0DA', 200: '#C6E3B9', 500: '#6BA65A', 700: '#3F7333' },
        ink: { DEFAULT: '#3D3230', soft: '#6B5E5A', mute: '#7D706B' },
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', '"Hiragino Maru Gothic ProN"', '"Hiragino Sans"', '"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -6px rgba(140, 90, 40, 0.18)',
        card: '0 2px 12px -4px rgba(140, 90, 40, 0.16)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
}
