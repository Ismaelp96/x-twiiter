/* eslint-disable @next/next/no-img-element */
'use client';

import { useSession } from 'next-auth/react';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function Input() {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <div className='w-full flex items-start mx-auto border-b border-gray-200 space-x-3 p-3'>
      <img
        src={session?.user?.image}
        alt='user-img'
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200'
      />
      <div className='pl-4 w-full space-y-2'>
        <textarea
          name=''
          rows='2'
          placeholder="What's happening?"
          id=''
          className='tracking-wide placeholder:text-gray-500 text-gray-700 bg-white placeholder:text-base resize-none min-h-[50px] xl:min-h-[120px] border-b pt-1 border-gray-200 flex-1 w-full focus:border-blue-400/40 focus:outline-none'
        ></textarea>
        <div className='flex items-center justify-between w-full'>
          <HiOutlinePhotograph className='w-9 h-9 p-1 text-sky-500 hover:bg-sky-100 cursor-pointer rounded-full transition-all duration-200' />
          <button className='bg-blue-400 text-white font-bold rounded-full px-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md inline-block disabled:opacity-50'>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
