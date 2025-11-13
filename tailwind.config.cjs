/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			sm: "540px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			borderRadius: {
				"4xl": "2rem",
				"5xl": "3rem",
				"6xl": "4rem",
				"7xl": "5rem",
			},
			colors: {
				black: "#131313",
			primary: {
				50: "#f0f9f8",
				100: "#d9f0ee",
				200: "#b3e0dd",
				300: "#9dd3ca",
				400: "#76bdaf",
				500: "#5aa899",
				600: "#47877c",
				700: "#3b6d65",
				800: "#335852",
				900: "#2d4a45",
				950: "#162b29",
			},
			secondary: {
				50: "#f1f1fe",
				100: "#e3e3fc",
				200: "#cdccfa",
				300: "#aeaaf6",
				400: "#8e83f0",
				500: "#7460e8",
				600: "#6447db",
				700: "#5838c1",
				800: "#484398",
				900: "#3e3a7b",
				950: "#262450",
			},
				lime: {
					50: "hsl(64, 100%, 95%)",
					100: "hsl(66, 100%, 89%)",
					200: "hsl(68, 100%, 79%)",
					300: "hsl(70, 100%, 66%)",
					400: "hsl(71, 96%, 55%)",
					500: "hsl(72, 99%, 49%)",
					600: "hsl(74, 100%, 35%)",
					700: "hsl(74, 97%, 27%)",
					800: "hsl(75, 84%, 23%)",
					900: "hsl(76, 75%, 20%)",
					950: "hsl(78, 100%, 10%)",
				},
				blue: {
					50: "hsl(240, 100%, 97%)",
					100: "hsl(245, 100%, 95%)",
					200: "hsl(244, 100%, 90%)",
					300: "hsl(247, 100%, 83%)",
					400: "hsl(249, 100%, 73%)",
					500: "hsl(252, 100%, 62%)",
					600: "hsl(256, 100%, 54%)",
					700: "hsl(255, 98%, 50%)",
					800: "hsl(255, 97%, 42%)",
					900: "hsl(256, 95%, 37%)",
					950: "hsl(253, 100%, 23%)",
				},
			},
			fontFamily: {
				display: ["Raleway", ...defaultTheme.fontFamily.sans],
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	safelist: [
		{
			pattern: /row-start-\d+/,
			variants: ["md"],
		},
	],
	plugins: [
		require.resolve("prettier-plugin-astro"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
