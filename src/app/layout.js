import { Inter } from 'next/font/google';

import './globals.css';

import SessionWrapper from '@/components/SessionWrapper';
import Input from '@/components/Input';
import Sidebar from '@/components/Sidebar';
import News from '@/components/News';
import CommentModal from '@/components/CommentModal';

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
          <div className='flex items-start justify-between w-full max-w-[1440px] mx-auto'>
            <div className='h-screen w-full max-w-24 xl:max-w-[220px] sticky top-0'>
              <Sidebar />
            </div>
            <div>{children}</div>
            <div className='lg:flex-col p-3 min-h-screen hidden lg:flex w-full max-w-[24rem]'>
              <div className='sticky top-0 bg-white py-2 space-y-4'>
                <input
                  type='text'
                  placeholder='Search'
                  className='bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2'
                />
              </div>
              <News />
            </div>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
