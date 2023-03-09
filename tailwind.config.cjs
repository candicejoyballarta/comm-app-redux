/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				shake: {
					'0%': { transform: 'translateX(30)' },
					'20%': { transform: 'translateX(-30px)' },
					'40%': { transform: 'translateX(15px)' },
					'60%': { transform: 'translateX(-15px)' },
					'80% ': { transform: 'translateX(8px)' },
					'100%': { transform: 'translateX(0)' },
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
			},
			animation: {
				shake: 'shake 0.5s linear',
				wiggle: 'wiggle 1s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
