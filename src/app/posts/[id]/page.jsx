import Comments from '@/components/Comments';
import Post from '@/components/Post';
import { app } from '@/firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export default async function PostPage({ params }) {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  data = { ...querySnapshot.data(), id: querySnapshot.id };

  return (
    <div className='w-full border-l min-h-screen border-r'>
      <div className='w-full px-3 py-2 sticky top-0 z-20 bg-white border-b border-b-gray-200 flex items-center space-x-2'>
        <Link
          href={'/'}
          className='hover:bg-gray-100 transition-colors duration-200 p-2 rounded-full'
        >
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <span className='text-base sm:text-lg'>Back</span>
      </div>
      <Post post={data} id={data.id} />
      <Comments id={params.id} />
    </div>
  );
}
