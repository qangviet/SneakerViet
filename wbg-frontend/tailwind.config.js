/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                cloud: "#f1f5f9",
            },
            keyframes: {
                slideDown: {
                    "0%": { transform: "translateY(-30%)" },
                    "100%": { transform: "translateY(0%)" },
                },
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
            fontFamily: {
                Quicksand: ["Quicksand", "sans-serif"],
                Publicsand: ["Public Sans", "sans-serif"],
            },
            animation: {
                slideDown: "slideDown .5s ease-in-out",
                fadeIn: "fadeIn .5s ease-in-out",
            },
        },
    },
    plugins: [],
    variants: {},
};
