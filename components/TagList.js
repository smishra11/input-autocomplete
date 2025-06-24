import React from 'react';
import Tag from './Tag';

const TagList = ({ tags, removeTag, color }) => {
  return (
    <div className='flex flex-wrap gap-1'>
      {tags.map((tag) => (
        <Tag key={tag.id} data={tag} removeTag={removeTag} color={color} />
      ))}
    </div>
  );
};

export default React.memo(TagList);
