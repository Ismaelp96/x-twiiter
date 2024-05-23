/* eslint-disable @next/next/no-img-element */
'use client';

import { app } from '@/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';

export default function Comment({ comment, commentId, originalPostId }) {
  const db = getFirestore(app);
  const { data: session } = useSession();

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const handlerLikePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            originalPostId,
            'comments',
            commentId,
            'likes',
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

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
        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart
              onClick={handlerLikePost}
              className='h-9 w-9 cursor-pointer rounded-full transiton duration-500 text-red-600 ease-in-out p-2 hover:text-gray-300'
            />
          ) : (
            <HiOutlineHeart
              onClick={handlerLikePost}
              className='h-9 w-9 cursor-pointer rounded-full transiton duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && 'text-red-600'}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
