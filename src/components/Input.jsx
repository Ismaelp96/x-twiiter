/* eslint-disable @next/next/no-img-element */
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';

import { app } from '../../firebase';

export default function Input() {
  const { data: session } = useSession();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagefileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState(false);

  const imagePickRef = useRef(null);
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const uploadImageToStorage = () => {
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.log(error);
            setImageFileUploading(false);
            setImageFileUrl(null);
            setSelectedFile(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setImageFileUploading(false);
            });
          }
        );
      };
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const handleSubmit = async () => {
    setPostLoading(true);
    const docReff = await addDoc(collection(db, 'posts'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
      image: imagefileUrl,
    });
    setPostLoading(false);
    setText('');
    setImageFileUrl(null);
    setSelectedFile(null);
  };

  if (!session) return null;

  return (
    <div className='w-full flex items-start mx-auto border-b border-gray-200 space-x-3 p-3'>
      <img
        src={session?.user?.image}
        alt='user-img'
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200'
      />
      <div className='pl-4 w-full space-y-2'>
        <textarea
          name=''
          rows='2'
          placeholder="What's happening?"
          id=''
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='tracking-wide placeholder:text-gray-500 text-gray-700 bg-white placeholder:text-base resize-none min-h-[50px] xl:min-h-[120px] border-b pt-1 border-gray-200 flex-1 w-full focus:border-blue-400/40 focus:outline-none'
        ></textarea>
        {selectedFile && (
          <div className='relative w-full h-[250px] cursor-pointer overflow-hidden'>
            <img
              src={imagefileUrl}
              alt='image'
              className={`h-auto w-full max-w-fit max-h-[250px] ${
                imageFileUploading ? 'animate-pulse' : ''
              }`}
            />
            <button className='text-gray-300 hover:text-blue-200 transition-colors absolute top-2 right-2'>
              <IoIosCloseCircleOutline className='xl:h-10 xl:w-10' />
            </button>
          </div>
        )}
        <div className='flex items-center justify-between w-full z-20'>
          <input
            type='file'
            ref={imagePickRef}
            accept='image/*'
            onChange={addImageToPost}
            hidden
          />
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current.click()}
            className='w-9 h-9 p-1 text-sky-500 hover:bg-sky-100 cursor-pointer rounded-full transition-all duration-200'
          />
          <button
            disabled={text.trim() === '' || postLoading || imageFileUploading}
            onClick={handleSubmit}
            className='bg-blue-400 text-white font-bold rounded-full px-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md inline-block disabled:opacity-50'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
