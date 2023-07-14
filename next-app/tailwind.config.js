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
			bgd: "#101427",
			bgm: "#006363",
			bgc: "#e88110",
			cit: "#F3A754",
			mod: "#008A8A",
		},
        fontFamily: {
				bau: ['Baumans'],
				exo: ['Exo'],
			},
		borderRadius: {
			'dc': '12px',
			'dd': '40px',
			'gen': '32px',
			'med': '22px',
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
