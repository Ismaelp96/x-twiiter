/* eslint-disable @next/next/no-img-element */
'use client';

import { useRecoilState } from 'recoil';
import ReactModal from 'react-modal';
import { HiX } from 'react-icons/hi';
import { useSession } from 'next-auth/react';

import { modalState, postIdState } from '@/atom/modalAtom';
import { useEffect, useState } from 'react';
import { app } from '@/firebase';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

export default function CommentModal() {
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState('');

  const handlerSendComment = async () => {};

  useEffect(() => {
    if (postId !== '') {
      const postRef = doc(db, 'posts', postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log('no such document!');
        }
      });
      return () => unsubscribe();
    }
  }, [db, postId]);

  return (
    <div>
      {open && (
        <ReactModal
          isOpen={open}
          ariaHideApp={false}
          className='max-w-lg w-[90%] absolute top-24 left-[50%] -translate-x-[50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
        >
          <div className='p-4'>
            <div className='border-b border-gray-200 py-2 px-1'>
              <button onClick={() => setOpen(false)}>
                <HiX className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full' />
              </button>
            </div>
            <div className='flex items-center space-x-1 relative p-2'>
              <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300' />
              <img
                src={post?.profileImg}
                alt={post ? post?.name : ''}
                title={post ? post?.name : ''}
                className='h-11 w-11 rounded-full mr-4'
              />
              <h4 className='font-bold sm:text-[16px] text-[15px] hover:underline truncate'>
                {post?.name}
              </h4>
              <span className='text-sm sm:text-[15px] truncate'>
                @{post?.username}
              </span>
            </div>
            <p className='text-gray-500 text-[15px] sm:text-base ml-16 mb-2'>
              {post?.text}
            </p>
            <div className='flex p-3 space-x-3'>
              <img
                src={session.user.image}
                alt={session ? session.user?.name : ''}
                title={session ? session.user?.name : ''}
                className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
              />
              <div className='w-full'>
                <div>
                  <textarea
                    className='w-full border-none outline-none tracking-wide min-h-[60px] h-full text-gray-700 placeholder:text-gray-400 resize-none'
                    placeholder="what's happening?"
                    rows='2'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>
                <div className='flex items-center justify-end pt-2.5'>
                  <button
                    disabled={input.trim('') === ''}
                    onClick={handlerSendComment}
                    className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
