import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Providers } from '@/components/providers/Providers';

import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Flame',
  description: 'Flame - self-hosted startpage for your server',
  icons: {
    icon: '/icons/favicon.ico',
    apple: [
      { url: '/icons/apple-touch-icon.png' },
      { url: '/icons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/icons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/icons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/icons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/icons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/icons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
