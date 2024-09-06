/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{html,js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js',
    ],
    theme: {
        fontFamily: {
            sans: ['"Roboto Slab"', 'serif'],
        },
        extend: {
            colors: {
                primary: '#EB1D25',
            },
            fontSize: {
                'xxs': '0.625rem',
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
};