import React, { useState } from 'react';

const Search = ({ doSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(term);
  };

  const handleInput = (e) => {
    setTerm(e.target.value);

    if (e.target.value === '') {
      doSearch('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="search-form"
      className="mt-6 relative max-w-lg mx-auto"
    >
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        value={term}
        onInput={handleInput}
        className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
        type="search"
        placeholder="Search"
      />
    </form>
  );
};

export default Search;
