import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import { v4 as uuidv4 } from 'uuid';

import { SearchIcon, ClearIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import SearchHistory from './SearchHistory/SearchHistory';
import Popper from '~/components/popper';
import SearchServer from './SearchServer';
import useDebounce from '~/components/hooks/useDebounce';
import Modal from '../Modal/Modal';

const cx = classNames.bind(styles);

const Search = ({ className }) => {
  const [searchValue, setSearchValue] = useState(''); //oke
  const [showResult, setShowResult] = useState(false); //oke
  const [hasValue, setHasValue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchResultLocalStorage, setSearchResultLocalStorage] = useState([]);
  const [searchResultServer, setSearchResultServer] = useState([]);

  const inputRef = useRef();
  const debounceSearchValue = useDebounce(searchValue.trim(), 800);
  const dataGetLocal =
    JSON.parse(localStorage.getItem('searchValueLocal')) || [];

  useEffect(() => {
    if (!debounceSearchValue.trim().length) {
      setSearchValue('');
      return;
    }

    //  get data from server
    const FetchApi = () => {};
    // get data from locolstorage
    const getDataFromLocalStorage = () => {
      const newSearchValue = debounceSearchValue
        .toLowerCase()
        .replaceAll(' ', '');
      let valueTrue;
      if (dataGetLocal.length > 0) {
        valueTrue = dataGetLocal.filter((value) => {
          return value.title?.includes(newSearchValue, 0);
        });
      } else {
        valueTrue = [];
      }
      //khong tim thay trong localstorage
      if (valueTrue && valueTrue.length == 0) {
        setHasValue(true);
        localStorage.setItem(
          'searchValueLocal',
          JSON.stringify([
            ...dataGetLocal,
            {
              title: newSearchValue,
              id: uuidv4(),
            },
          ]),
        );
      } else {
        setHasValue(false);
        setSearchResultLocalStorage(valueTrue);
        const isExact = valueTrue.find((value) => {
          return newSearchValue.toString() === value.title.toString();
        });
        if (isExact === undefined) {
          localStorage.setItem(
            'searchValueLocal',
            JSON.stringify([
              ...dataGetLocal,
              {
                title: newSearchValue,
                id: uuidv4(),
              },
            ]),
          );
        }
      }
    };
    getDataFromLocalStorage();
  }, [debounceSearchValue]);

  const handleClick = (e) => {};

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <>
      <HeadlessTippy
        interactive
        placement="bottom"
        offset={[0, 0]}
        visible={showResult && debounceSearchValue.length > 0}
        onClickOutside={() => {
          setShowResult(false);
        }}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <Popper className={cx('search-popper')}>
              {hasValue ? (
                <p className={cx('search-head')}>
                  Không tìm thấy kết quả cho {debounceSearchValue.trim()}
                </p>
              ) : (
                <>
                  {searchResultServer.length > 0 && (
                    <>
                      <p className={cx('search-head')}>Search Result</p>
                      <SearchServer />
                    </>
                  )}
                  {searchResultLocalStorage.length > 0 && (
                    <>
                      <p className={cx('search-head')}>Search History</p>
                      {searchResultLocalStorage.map((data) => {
                        return (
                          <SearchHistory
                            data={data}
                            key={data.id}
                            setShowModal={setShowModal}
                          />
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </Popper>
          </div>
        )}
      >
        <div className={cx('wrapper', className)}>
          {showResult && (
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
            onFocus={() => {
              setShowResult(true);
            }}
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

      {showModal && (
        <Modal>
          <p className={cx('modal-title')}>
            Xóa {debounceSearchValue} khỏi lịch sử tìm kiếm của bạn ?
          </p>
        </Modal>
      )}
    </>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
