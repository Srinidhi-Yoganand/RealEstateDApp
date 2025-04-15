import React from 'react';

const Search = () => {
  return (
    <header className="search-header">
      <h2 className="header__title">Search it. Explore it. Buy it.</h2>
      
      <input
        type="text"
        className="header__search"
        placeholder="Enter an address, neighborhood, city, or ZIP code"
      />
    </header>
  );
};

export default Search;
