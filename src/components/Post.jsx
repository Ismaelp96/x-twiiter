/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import Icons from './Icons';

export default function Post({ post, id }) {
  return (
    <div className='w-full flex items-start justify-between border-b border-gray-200 p-4 gap-2 hover:bg-gray-50 transition-colors duration-300'>
      <div className='max-w-[44px]'>
        <img
          src={post?.profileImg}
          alt='user-img'
          className='w-full h-full rounded-full object-cover'
        />
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex w-full items-start justify-between mb-6'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-sm truncate'>{post?.name}</h4>
            <p className='text-gray-600 text-xs truncate'>@{post?.username}</p>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>
        <div className='w-full'>
          <Link href={`/post/${id}`}>
            <p className='text-gray-800 text-sm mb-2'>{post?.text}</p>
            {post?.image && (
              <img
                src={post?.image}
                alt={post ? 'post-img' : ''}
                className='w-full mt-3 rounded-2xl'
              />
            )}
          </Link>
        </div>
        <Icons id={id} />
      </div>
    </div>
  );
}
