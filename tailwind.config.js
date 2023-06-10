/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                mylightpink: '#f2ede7',
                mylightgray: '#f3f4f6',
                mydarkred: '#af253c'
            },
            fontFamily: {
                geologica: ['Geologica', 'sans-serif'],
                rubik: ['Rubik', 'sans-serif']
            }
        }
    },
    plugins: []
}
