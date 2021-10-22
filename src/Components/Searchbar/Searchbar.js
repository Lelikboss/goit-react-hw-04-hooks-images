import { useState } from 'react';
import PropTypes from 'prop-types';
export default function Searchbar({ getSearchValue }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log('Before fetch:', searchValue);
    getSearchValue(searchValue);
  };

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSearchSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  getSearchValue: PropTypes.func.isRequired,
};
