import React from 'react';

const SuggestionList = ({ suggestionData, selectTag, activeTag }) => {
  return (
    <ul
      role='listbox'
      className='absolute max-h-50 overflow-y-auto w-full mt-2 rounded-lg border-1 border-gray-400 bg-white'
    >
      {suggestionData.length === 0 ? (
        <li
          className='px-3 py-2 text-gray-500 cursor-default'
          role='option'
          aria-selected='false'
          aria-disabled='true'
        >
          No tag found
        </li>
      ) : (
        suggestionData.map((data, i) => (
          <li
            key={data.id}
            role='option'
            aria-selected={i === activeTag}
            onClick={() => selectTag(data)}
            className={`p-2 cursor-pointer ${
              i === activeTag ? 'bg-gray-200' : ''
            }`}
          >
            {data.name}
          </li>
        ))
      )}
    </ul>
  );
};

export default React.memo(SuggestionList);
