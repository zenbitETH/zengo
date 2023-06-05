	/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	enabled: true,
	darkMode: "class",
  theme: {
    extend: {
      	colors: {
			display: ["group-hover"],
			cata: {
				900: "#E0A65A95",
				800: "#bfa98c",
				700: "#cdaa7e",
				600: "#daac71",
				500: "#744b16",
				400: "#e8ad63",
				300: "#efae5c",
				200: "#f6af55",
				100: "#E0A65A",
			},
			mods: {
				100: "#119195",
				200: "#0b979b",
				300: "#119195",
				400: "#178b8f",
				500: "#247f82",
				600: "#024269",
				700: "#3e6768",
				800: "#4a5b5c",
				900: "#011B2F",
			},
		},
        fontFamily: {
				bau: ['Baumans'],
				exo: ['Exo'],
			},

		borderRadius: {
			'dc': '12px',
			'dd': '22px',
			'gen': '32px',
			'med': '20px',
			'but': '52px',
		},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
	require('tailwind-scrollbar-hide'),
	// ...
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}
