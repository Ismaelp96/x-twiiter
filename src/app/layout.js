import { Inter } from 'next/font/google';

import './globals.css';

import News from '@/components/News';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'X - Twitter',
  description: 'basead in X website',
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang='en'>
        <body className={inter.className}>
          <div>{children}</div>
        </body>
      </html>
    </SessionWrapper>
  );
}
