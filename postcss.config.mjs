/** @type {import('postcss-load-config').Config} */
const config = {
     reactStrictMode: false,
     compiler: {
          styledComponents: true,
     },
     plugins: {
          tailwindcss: {},
     },
};

export default config;
