import Image from 'next/image';
import React from 'react';

const Tag = ({ data, removeTag, tagColor }) => {
  return (
    <div
      className={`inline-flex items-center bg-${tagColor}-200 text-${tagColor}-700 px-2 py-1 rounded-lg mr-1`}
    >
      <span>{data.name}</span>
      <button
        onClick={() => removeTag(data)}
        className='font-bold cursor-pointer focus:outline-none ml-2'
      >
        <Image src='/close.png' alt='X' width={15} height={15} />
      </button>
    </div>
  );
};

export default Tag;
