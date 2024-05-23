/* eslint-disable @next/next/no-img-element */
'use client';

import { HiDotsHorizontal } from 'react-icons/hi';

export default function Comment({ comment, id }) {
  return (
    <div className='w-full flex items-start justify-between border-b border-gray-200 p-4 gap-2 hover:bg-gray-50 transition-colors duration-300 pl-10'>
      <div className='max-w-[40px]'>
        <img
          src={comment?.userImg}
          alt='user-img'
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex w-full items-start justify-between mb-6'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
            <p className='text-gray-600 text-xs truncate'>
              @{comment?.username}
            </p>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>
        <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
      </div>
    </div>
  );
}
