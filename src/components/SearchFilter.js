// src/components/SearchFilter.js
import React from 'react';

const SearchFilter = ({ filterText, onFilterChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search tasks..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;