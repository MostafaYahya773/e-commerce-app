/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      'bg-primary': '#F2F0F1',
      'bg-secondry': '#F0F0F0',
      'bg-products': '#F0EEED',
      'star-color': '#FFC633',
      'verfied-color': '#01AB31',
      'descount-color': '#FF3333',
      'heart-color': '#dddcdc',
    },
    fontFamily: {
      archivo: ['var(--font-archivo)'],
      roboto: ['var(--font-roboto)'],
    },
    fontSize: {
      10: '0.625rem', // 10px
      12: '0.75rem', // 12px
      14: '0.875rem', // 14px
      16: '1rem', // 16px
      18: '1.125rem', // 18px
      20: '1.25rem', // 20px
      24: '1.5rem', // 24px
      32: '2rem', // 32px
      36: '2.25rem', // 36px
      40: '2.5rem', // 40px
      48: '3rem', // 48px
      64: '4rem', // 64px
    },
    spacing: {
      0: '0', // 0px
      1: '0.0625rem', // 1px
      2: '0.125rem', // 2px
      4: '0.25rem', // 4px
      5: '0.3125rem', // 5px
      6: '0.375rem', // 6px
      7: '0.4375rem', // 7px
      8: '0.5rem', // 8px
      9: '0.5625rem', // 9px
      10: '0.625rem', // 10px
      12: '0.75rem', // 12px
      15: '0.9375rem', // 15px
      20: '1.25rem', // 20px
      18: '1.125rem', // 18px
      22: '1.375rem', // 22px
      28: '1.75rem', // 28px
      30: '1.875rem', // 30px
      35: '2.1875rem', // 35px
      40: '2.5rem', // 40px
      45: '2.8125rem', // 45px
      50: '3.125rem', // 50px
      53: '3.25rem', // 53px
      55: '3.4375rem', // 55px
      60: '3.75rem', // 60px
      65: '4.0625rem', // 65px
      70: '4.375rem', // 70px
      80: '5rem', // 80px
      100: '6.25rem', // 100px
      150: '9.375rem', // 150px
      200: '12.50rem', //200px
      300: '18.75rem', // 300px
      400: '25rem', // 400px
      500: '31.25rem', // 500px
    },
    screens: {
      xs: '22.6rem', // 375px
      sm: '35rem', // 550px
      md: '48rem', // 768px
      lg: '64rem', // 1024px
      xl: '70.625rem', // 1130px
    },
  },
  plugins: [],
};
