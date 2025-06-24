import React, { useCallback, useEffect, useState } from 'react';
import TagList from './TagList';
import SuggestionList from './SuggestionList';

const TagInput = ({ selectedTag, setSelectedTag }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [activeTag, setActiveTag] = useState(1);

  const suggestionItemsLimit = 7;

  // Fetching mock data from API
  const fetchData = async () => {
    try {
      let res = await fetch('/api');
      let result = await res.json();
      if (!res.ok || result.success === false) {
        setError(result.error || 'Something went wrong');
      }
      setData(result.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  // Tag selection
  const selectTag = useCallback(
    (tag) => {
      if (selectedTag.find((t) => t.id === tag.id)) return;
      const updatedTags = [...selectedTag, tag];
      setSelectedTag(updatedTags);
      setInput('');
      setSuggestionData([]);
      setShowSuggestion(false);
      setActiveTag(-1);
    },
    [selectedTag, setSelectedTag]
  );

  // Remove tag
  const removeTag = useCallback(
    (tag) => {
      let filtered = selectedTag.filter((data) => data.id !== tag.id);
      setSelectedTag(filtered);
      if (input) {
        const filteredData = data
          .filter(
            (item) =>
              item.name.toLowerCase().includes(input.toLowerCase()) &&
              !filtered.some((data) => data.id === item.id)
          )
          .slice(0, suggestionItemsLimit);
        setSuggestionData(filteredData);
      }
    },
    [data, input, selectedTag, setSelectedTag]
  );

  // Handling keydown features
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!suggestionData.length) return;
      setActiveTag((prev) => (prev + 1) % suggestionData.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!suggestionData.length) return;
      setActiveTag(
        (prev) => (prev - 1 + suggestionData.length) % suggestionData.length
      );
    } else if (
      e.key === 'Enter' &&
      activeTag >= 0 &&
      suggestionData[activeTag]
    ) {
      e.preventDefault();
      selectTag(suggestionData[activeTag]);
    } else if (e.key === 'Backspace' && input === '') {
      removeTag(selectedTag[selectedTag.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestion(false);
    }
  };

  // Input change
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInput(value);
    if (!value) {
      setShowSuggestion(false);
      return;
    }
    setShowSuggestion(true);
    const filtered = data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedTag.some((tag) => tag.id === item.id)
      )
      .slice(0, 7);
    setSuggestionData(filtered);
    setActiveTag(0);
  };

  return (
    <div className='relative'>
      <TagList tags={selectedTag} removeTag={removeTag} tagColor='blue' />
      <input
        className='border border-gray-300 w-full rounded-lg p-2 mt-3'
        placeholder={loading ? 'Loading tags...' : 'Search'}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      {showSuggestion && (
        <SuggestionList
          suggestionData={suggestionData}
          selectTag={selectTag}
          activeTag={activeTag}
        />
      )}
    </div>
  );
};

export default TagInput;
