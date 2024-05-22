'use client';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi';
import MiniProfile from './MiniProfile';

export default function Sidebar() {
  return (
    <aside className='flex flex-col justify-between items-start h-full w-full max-w-56 py-4 px-2'>
      <div className='w-full flex xl:items-start xl:justify-between'>
        <Link href='/'>
          <FaXTwitter className='w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 p-2' />
        </Link>
        <Link
          href='/'
          className='hover:bg-gray-100 rounded-full transition-all duration-200 xl:flex items-center gap-2 w-fit px-3 py-2 hidden '
        >
          <span className='font-bold text-lg'>Home</span>
          <HiHome className='w-7 h-7' />
        </Link>
      </div>
      <div>
        <MiniProfile />
      </div>
    </aside>
  );
}
