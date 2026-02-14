/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'zip-dark': '#1e1e1e', // Approximate dark text
                'zip-orange': '#ff5a1f', // Approximate main brand color (needs tuning)
                'zip-light-bg': '#f3f2ef', // LinkedIn gray background
            }
        },
    },
    plugins: [],
}
