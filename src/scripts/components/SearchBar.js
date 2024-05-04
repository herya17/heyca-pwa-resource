import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function SearchBar({ keyword, keywordChange }) {
  const { localeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;

  return (
    <div className='search-bar'>
      <input
        className='input'
        type='text'
        placeholder={locale === 'id' ? 'Cari catatan' : 'Search notes'}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)} />
    </div>
  );
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
}

export default SearchBar;
