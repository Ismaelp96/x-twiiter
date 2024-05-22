'use client';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi';
import MiniProfile from './MiniProfile';

export default function Sidebar() {
  return (
    <aside className='flex flex-col justify-between items-end h-full w-full max-w-56 py-4 px-2'>
      <div className='w-full flex justify-end pr-4'>
        <Link href='/'>
          <FaXTwitter className='w-12 h-12 hover:bg-gray-100 rounded-full transition-all duration-200 p-2' />
        </Link>
      </div>
      <div>
        <MiniProfile />
      </div>
    </aside>
  );
}
