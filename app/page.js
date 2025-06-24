'use client';

import TagInput from '@/components/TagInput';
import { useState } from 'react';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState([]);

  return (
    <div className='flex justify-center p-10'>
      <div className='flex flex-col gap-8 border-2 border-gray-400 p-6 rounded-lg w-130'>
        <h3>Smart tag input with dynamic search</h3>
        <TagInput selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </div>
    </div>
  );
}
