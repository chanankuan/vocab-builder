import localFont from 'next/font/local';

export const macpaw = localFont({
  src: [
    {
      path: '../public/fonts/MacPawFixelDisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/MacPawFixelDisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/MacPawFixelDisplay-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/MacPawFixelDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
