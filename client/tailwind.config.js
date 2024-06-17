/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primaryBg: '#333',
                primaryText: '#fff',
                secondaryBg: '#ccc',
                secondaryText: '#333',
                highlight: '#f3f3f3'
            }
        }
    },
    plugins: []
}
