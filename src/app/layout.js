import { Inter } from 'next/font/google';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import News from '@/components/News';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'X',
	description: 'basead in X website',
};

export default function RootLayout({ children }) {
	return (
		<SessionWrapper>
			<html lang='en'>
				<body className={inter.className}>
					<div className='flex items-start justify-between w-full max-w-[1440px]  mx-auto px-5'>
						<div className=' border-r h-screen w-full max-w-[220px]'>
							<Sidebar />
						</div>
						<div>{children}</div>
						<div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>
							<div className='sticky top-0 bg-white py-2 space-y-4'>
								<input
									type='text'
									placeholder='Search'
									className='bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2'
								/>
								<News />
							</div>
						</div>
					</div>
				</body>
			</html>
		</SessionWrapper>
	);
}
