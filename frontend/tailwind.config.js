import daisyui from 'daisyui';
import { transform } from 'typescript';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                'hard': '2px 2px 1px 2px',
                'lesshard': '1.5px 1.5px 1px 1px',
            },
            dropShadow: {
                'hard': '2px 2px 1px rgba(0, 0, 0, 1)',
                'small': '1px 1px 1px rgba( 0, 0, 0, 1)',
            },
            backgroundSize: {
                'Doble': '200%',
                'OneAndHalf': '150% 40px'
            },
            keyframes: {
                sliceRight: {
                    '0%': {transform: 'translateX(100%)', opacity: '0.5'},
                    '100%': {transform: 'translateX(0%)', opacity: '1'},
                },
                sliceLeft: {
                    '0%': {transform: 'translateX(-100%)', opacity: '0.5'},
                    '100%': {transform: 'translateX(0%)', opacity: '1'},
                }
            },
            animation: {
                sliceRight: 'sliceRight .5s ease',
                sliceLeft: 'sliceLeft .5s ease'
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
        daisyui
    ],
};
