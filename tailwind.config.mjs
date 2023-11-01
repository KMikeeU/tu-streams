import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		createThemes({
			dark: {
				"main": "#111",
				"contrast": "#0b0a09",
				"on-main": "white",
				"primary": "#CEFF1A",
			},
			light: {
				"main": "#f2f2f2",
				"contrast": "#e4e4e4",
				"on-main": "#191716",
				"primary": "#55CF15",
			}
		})
	],
}
