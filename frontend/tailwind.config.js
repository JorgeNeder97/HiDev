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
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
