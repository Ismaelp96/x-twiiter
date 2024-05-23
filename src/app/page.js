import CommentModal from '@/components/CommentModal';
import Feed from '@/components/Feed';
import Input from '@/components/Input';
import News from '@/components/News';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className='flex items-start justify-between w-full max-w-[1440px]  mx-auto'>
      <div className='h-screen w-full max-w-24 xl:max-w-[220px] sticky top-0'>
        <Sidebar />
      </div>
      <div className='w-full border-l min-h-screen border-r'>
        <div className='py-2 px-3 sticky top-0 z-20 bg-white border-b border-gray-200'>
          <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        </div>
        <Input />
        <Feed />
        <CommentModal />
      </div>
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
  );
}
