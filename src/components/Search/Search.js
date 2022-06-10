import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { v4 as uuidv4 } from 'uuid';

import { SearchIcon, ClearIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import SearchHistory from './SearchHistory/SearchHistory';
import Popper from '~/components/popper';
import SearchResult from './SearchResult';
import useDebounce from '~/components/hooks/useDebounce';

const cx = classNames.bind(styles);

const Search = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [searchResultApi, setSearchResultApi] = useState([]);
  const [searchResultLocal, setSearchResultLocal] = useState([]);

  const debounceSearchValue = useDebounce(searchValue.trim(), 800);

  const searchValueGetLocal =
    JSON.parse(localStorage.getItem('searchValueLocal')) || [];

  useEffect(() => {
    if (!debounceSearchValue.trim().length) {
      setShowResult([]);
      setSearchValue('');
      return;
    }

    //xử lý tìm kiêm với local => từ tìm kiếm
    if (searchValueGetLocal.length > 0) {
      let searchValue = debounceSearchValue.trim().replaceAll(' ', '');
      const newSearchResultLocal = searchValueGetLocal.filter((value) => {
        return value.title.includes(searchValue, 0);
      });
      setSearchResultLocal(newSearchResultLocal);
    }

    //xử lý tìm kiêm với API sever => các loại phim
    const fecthApi = async () => {};
    fecthApi();

    const setItemLocal = () => {
      let isLike = false;
      let searchValue = debounceSearchValue.trim().replaceAll(' ', '');
      // không lưu nếu search value giống 100% giá trị trong local, tránh lãnh phí
      if (searchValueGetLocal.length > 0) {
        searchValueGetLocal.forEach((value) => {
          if (value.title.includes(searchValue, 0)) {
            isLike = true;
            return;
          }
        });
      }
      if (isLike) return;

      searchValueGetLocal.push({
        title: searchValue,
        id: uuidv4(), //tạo giá trị để lưu. có thể thêm time để sau này clear
      });

      localStorage.setItem(
        'searchValueLocal',
        JSON.stringify(searchValueGetLocal),
      );
    };
    setItemLocal();
  }, [debounceSearchValue]);

  const inputRef = useRef();

  const handleClick = (e) => {};

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <HeadlessTippy
      interactive
      placement="bottom"
      offset={[0, 0]}
      visible={
        showResult &&
        (searchResultLocal.length > 0 || searchResultApi.length > 0)
      }
      onClickOutside={() => setShowResult(false)}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <Popper className={cx('search-popper')}>
            <p className={cx('search-head')}>Search Result</p>
            <SearchResult />
            {searchResultLocal && (
              <p className={cx('search-head')}>Search History</p>
            )}
            {searchResultLocal &&
              searchResultLocal.map((data) => {
                return <SearchHistory key={data.id} data={data} />;
              })}
          </Popper>
        </div>
      )}
    >
      <div className={cx('wrapper', className)}>
        {searchValue.length > 0 && (
          <button className={cx('search-icon')}>
            <SearchIcon />
          </button>
        )}

        <input
          ref={inputRef}
          value={searchValue}
          type="text"
          className={cx('input')}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {searchValue.length > 0 && (
          <button className={cx('clear-btn')} onClick={handleClear}>
            <ClearIcon />
          </button>
        )}
        <button
          className={cx('search-btn')}
          onClick={handleClick}
          onMouseDown={(e) => e.preventDefault()}
        >
          <SearchIcon className={cx('search-btn-icon')} />
        </button>
      </div>
    </HeadlessTippy>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
