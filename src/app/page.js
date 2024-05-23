import Feed from '@/components/Feed';
import Input from '@/components/Input';
import CommentModal from '@/components/CommentModal';
import News from '@/components/News';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div className='w-full border-l min-h-screen border-r'>
      <div className='py-2 px-3 sticky top-0 z-20 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
      <Input />
      <Feed />
    </div>
  );
}
