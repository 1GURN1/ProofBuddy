/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'pb-bg':            '#FAF9F6',
        'pb-surface':       '#FFFFFF',
        'pb-border':        '#E8E4DC',
        'pb-text':          '#1A1A1A',
        'pb-muted':         '#6B6660',
        'pb-student':       '#1F3A2E',
        'pb-edu':           '#1E2A4A',
        'pb-error':         '#B54848',
        'pb-warning':       '#C28A2C',
        'pb-success':       '#5A8A6E',
        'pb-info':          '#4A6585',
        'pb-student-light': '#E8F0EB',
        'pb-edu-light':     '#E4E8F0',
        'pb-error-light':   '#F5E8E8',
        'pb-warning-light': '#F7F0E0',
        'pb-success-light': '#E8F2EC',
        'pb-info-light':    '#E6EDF4',
      },
      fontFamily: {
        fraunces:      ['Fraunces', 'Georgia', 'serif'],
        inter:         ['Inter', 'system-ui', 'sans-serif'],
        'source-serif':['Source Serif 4', 'Georgia', 'serif'],
        mono:          ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'btn':   '8px',
        'card':  '8px',
        'modal': '12px',
        'chip':  '4px',
      },
      boxShadow: {
        'card':  '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        'modal': '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
