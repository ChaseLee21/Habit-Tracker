/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                colorPrimary: 'var(--color-primary)',
                colorPrimaryDark: 'var(--color-primary-dark)',
                colorPrimaryLight: 'var(--color-primary-light)',
                colorSecondary: 'var(--color-secondary)',
                colorSecondaryDark: 'var(--color-secondary-dark)',
                colorSecondaryLight: 'var(--color-secondary-light)',
                colorBg: 'var(--color-bg)',
                colorBgAlt: 'var(--color-bg-alt)',
                colorText: 'var(--color-text)',
                colorTextSecondary: 'var(--color-text-secondary)',
                colorTextInverse: 'var(--color-text-inverse)',
                colorBorder: 'var(--color-border)',
                colorShadow: 'var(--color-shadow)',
                colorButtonBg: 'var(--color-button-bg)',
                colorButtonText: 'var(--color-button-text)',
                colorButtonBgAlt: 'var(--color-button-bg-alt)',
                colorButtonTextAlt: 'var(--color-button-text-alt)',
                colorLink: 'var(--color-link)',
                colorLinkHover: 'var(--color-link-hover)',
                colorSuccess: 'var(--color-success)',
                colorError: 'var(--color-error)',
                colorWarning: 'var(--color-warning)',
                colorInfo: 'var(--color-info)'
            }
        }
    },
    plugins: []
}
