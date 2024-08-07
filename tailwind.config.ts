import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mainFont: '#121417',
      secondaryFont: '#FCFCFC',
      mainBackground: '#F9F9F9 ',
      mainBackgroundAccent: '#A5C0B8',
      backdropBackground: 'rgba(18, 20, 23, 0.20)',
      success: '#3CBF61',
      danger: '#D80027',
      border: {
        main: '#DBDBDB',
      },
      gray: {
        light: '#D1D5DB',
        main: '#12141710',
        dark: '#12141750',
        darker: '#12141780',
      },
      green: {
        light: 'rgba(133, 170, 159, 0.10)',
        main: '#A5C0B8',
        dark: '#85AA9F',
      },
    },
    fontSize: {
      '2xs': [
        '10px',
        {
          lineHeight: '12px',
          fontWeight: '400',
        },
      ],
      xs: [
        '12px',
        {
          lineHeight: 'normal',
          fontWeight: '400',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: 'normal',
          fontWeight: '400',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: 'normal',
          fontWeight: '400',
        },
      ],
      lg: [
        '20px',
        {
          lineHeight: '30px',
          letterSpacing: 'normal',
          fontWeight: '400',
        },
      ],
      xl: [
        '24px',
        {
          lineHeight: '28px',
          letterSpacing: '-0.48px',
          fontWeight: '600',
        },
      ],
      '2xl': [
        '30px',
        {
          lineHeight: '32px',
          letterSpacing: '-0.6px',
          fontWeight: '600',
        },
      ],
      '3xl': [
        '40px',
        {
          lineHeight: '48px',
          letterSpacing: '-0.8px',
          fontWeight: '600',
        },
      ],
    },
    container: {
      center: true,
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1440px',
      },
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '32px',
        lg: '100px',
      },
    },
    extend: {
      transitionProperty: {
        link: 'color, background, padding',
        spacing: 'margin, padding',
      },
      rotate: {
        '14': '14deg',
        '24': '24deg',
      },
      backgroundImage: {
        'gradient-linear':
          'linear-gradient(311deg, rgba(133, 170, 159, 0.51) 23.19%, rgba(255, 255, 255, 0.00) 60.01%)',
        'sidebar-background': "url('/images/auth-bg-desktop.png')",
        'book-background': "url('/images/book.png')",
      },
      boxShadow: {
        modal: 'box-shadow: 0px 4px 47px 0px rgba(18, 20, 23, 0.08);',
      },
    },
  },
  plugins: [],
};
export default config;
