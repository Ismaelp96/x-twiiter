/* eslint-disable @next/next/no-img-element */
'use client';
import { FaXTwitter } from 'react-icons/fa6';
import { RxExit } from 'react-icons/rx';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <div className='flex items-end justify-end w-full'>
            <div className='w-full flex items-center gap-1'>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-2'>
                  <button onClick={() => signOut()} className='w-full max-w-5'>
                    <RxExit className='w-5 h-5 text-gray-900 hover:text-gray-400 pt-1 transition-colors duration-200' />
                  </button>
                  <img
                    src={session?.user?.image}
                    alt='user-profile-pic'
                    title={session?.user?.image ? 'user-profile-pic' : ''}
                    className='w-full max-w-[46px] rounded-full'
                  />
                </div>
                <h4 className='text-sm hidden xl:inline text-gray-500'>
                  @{session?.user.username}
                </h4>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='space-y-2 w-full'>
            <div className='flex items-center justify-center w-full gap-2'>
              <span className='text-sm text-gray-700'>Welcome to</span>
              <FaXTwitter size={20} />
            </div>
            <button
              onClick={() => signIn()}
              className='bg-blue-400 text-white font-semibold rounded-full px-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline-block'
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </>
  );
}
