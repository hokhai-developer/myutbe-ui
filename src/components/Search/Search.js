import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { SearchIcon, ClearIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import useWindowSize from '~/components/hooks/useWindowResize';

const cx = classNames.bind(styles);

const Search = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [showInput, setShowInput] = useState(true);

  const inputRef = useRef();
  const windowWidth = useWindowSize();

  const handleClick = (e) => {
    if (windowWidth <= 391) {
      setShowInput(!showInput);
      // inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (windowWidth <= 391) {
      setShowInput(false);
    }
  }, []);

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={cx('wrapper', className)}>
      {(inputFocus || searchValue.length > 0) && (
        <button className={cx('search-icon')}>
          <SearchIcon />
        </button>
      )}
      {showInput && (
        <input
          ref={inputRef}
          value={searchValue}
          type="text"
          className={cx('input')}
          placeholder="Search"
          autoFocus={inputFocus}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      )}
      {searchValue.length > 0 && (
        <button className={cx('clear-btn')} onClick={handleClear}>
          <ClearIcon />
        </button>
      )}
      <button
        className={cx(
          'search-btn',
          `${searchValue.length > 0 ? 'hasValue-search' : ''}`,
        )}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <SearchIcon className={cx('search-btn-icon')} />
      </button>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
