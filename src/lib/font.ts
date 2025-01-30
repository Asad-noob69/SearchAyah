import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '/fonts/Anton-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom', // Optional: Define a CSS variable
});