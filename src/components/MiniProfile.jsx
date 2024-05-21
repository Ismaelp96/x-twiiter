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
					<div className='flex items-center w-full space-x-2'>
						<div className='w-full flex items-center gap-2'>
							<img
								src={session?.user?.image}
								alt='user-profile-pic or instagram logo'
								title='user-profile-pic or instagram logo'
								className='w-full max-w-[46px] rounded-full'
							/>
							<h2 className='font-bold'>{session?.user?.username}</h2>
						</div>
						<button onClick={() => signOut()}>
							<RxExit className='w-5 h-5 text-gray-700 hover:text-gray-400' />
						</button>
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
							className='bg-blue-400 text-white font-semibold rounded-full px-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline-block'>
							Sign In
						</button>
					</div>
				</>
			)}
		</>
	);
}
