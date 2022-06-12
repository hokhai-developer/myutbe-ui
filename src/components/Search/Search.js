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
import { searchMovie } from '~/services';

const cx = classNames.bind(styles);

const Search = ({ className }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idItemDeleteFromLocalStorage, setIdItemDeleteFromLocalStorage] =
    useState('');
  const [dataHistory, setDataHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('searchValueLocal')) || [];
  });
  const [searchResultLocalStorage, setSearchResultLocalStorage] = useState([]);
  const [searchResultServer, setSearchResultServer] = useState([]);

  const inputRef = useRef();
  const debounceSearchValue = useDebounce(searchValue.trim(), 800);

  useEffect(() => {
    if (!debounceSearchValue.trim().length) {
      setSearchValue('');
      return;
    }
    //call API server
    const fetchApi = async () => {
      const result = await searchMovie(debounceSearchValue);
      if (result && result.results) {
        setSearchResultServer(result.results);
        setNoResult(true);
      }
    };
    fetchApi();

    // get data from locolstorage
    const getDataFromLocalStorage = () => {
      const newSearchValue = debounceSearchValue
        .toLowerCase()
        .replaceAll(' ', '');
      let valueTrue;
      if (dataHistory.length > 0) {
        valueTrue = dataHistory.filter((value) => {
          return value.title
            .toLowerCase()
            .replaceAll(' ', '')
            .includes(newSearchValue, 0);
        });
      } else {
        valueTrue = [];
      }
      //khong tim thay trong dataHistory
      if (valueTrue.length === 0) {
        setNoResult(false);
        const itemHistory = { title: debounceSearchValue.trim(), id: uuidv4() };
        localStorage.setItem(
          'searchValueLocal',
          JSON.stringify([...dataHistory, itemHistory]),
        );
        setDataHistory((pre) => [...pre, itemHistory]);
      } else {
        setNoResult(true);
        setSearchResultLocalStorage(valueTrue);
        const isExact = valueTrue.find((value) => {
          return (
            newSearchValue.toString().trim() ===
            value.title.toString().trim().toLowerCase().replaceAll(' ', '')
          );
        });
        if (isExact === undefined) {
          const itemHistory = {
            title: debounceSearchValue.trim(),
            id: uuidv4(),
          };
          localStorage.setItem(
            'searchValueLocal',
            JSON.stringify([...dataHistory, itemHistory]),
          );
          setDataHistory((pre) => [...pre, itemHistory]);
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

  const handleDeleteItemFromLocalStorage = (boolean) => {
    if (!boolean) {
      setIdItemDeleteFromLocalStorage('');
      return;
    } else {
      const indexItemSearchResult = searchResultLocalStorage.findIndex(
        (item) => {
          return item.id === idItemDeleteFromLocalStorage;
        },
      );
      if (indexItemSearchResult !== -1) {
        searchResultLocalStorage.splice(indexItemSearchResult, 1);
        setSearchResultLocalStorage((pre) => [...pre]);
        if (
          searchResultLocalStorage.length === 0 &&
          searchResultServer.length === 0
        ) {
          setNoResult(false);
        }
      }
      const indexItemDataHistory = dataHistory.findIndex((item) => {
        return item.id === idItemDeleteFromLocalStorage;
      });
      if (indexItemDataHistory !== -1) {
        dataHistory.splice(indexItemDataHistory, 1);
        setDataHistory((pre) => [...pre]);
        localStorage.setItem('searchValueLocal', JSON.stringify(dataHistory));
      }
      setIdItemDeleteFromLocalStorage('');
    }
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
          if (showModal) {
            setShowResult(true);
          }
        }}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <Popper className={cx('search-result-popper')}>
              {!noResult ? (
                <p className={cx('search-result-novalue')}>
                  Không tìm thấy kết quả cho "{debounceSearchValue.trim()}"
                </p>
              ) : (
                <>
                  {searchResultServer.length > 0 && (
                    <div className={cx('search-popper-list')}>
                      <p className={cx('search-fixed')}>Search Server</p>
                      <div className={cx('search-body')}>
                        {searchResultServer &&
                          searchResultServer.map((result, index) => {
                            return (
                              <SearchServer key={result.id} data={result} />
                            );
                          })}
                      </div>
                    </div>
                  )}
                  {searchResultLocalStorage.length > 0 && (
                    <div className={cx('search-popper-list')}>
                      <p className={cx('search-fixed')}>Search History</p>
                      <div className={cx('search-body')}>
                        {searchResultLocalStorage.map((data) => {
                          return (
                            <SearchHistory
                              data={data}
                              key={data.id}
                              setShowModal={setShowModal}
                              setIdItemDeleteFromLocalStorage={
                                setIdItemDeleteFromLocalStorage
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </Popper>
          </div>
        )}
      >
        <div className={cx('wrapper', className)}>
          {(showResult || searchValue.trim().length > 0) && (
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
            onBlur={() => {
              if (searchValue.trim().length === 0) {
                setShowResult(false);
              }
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
        <Modal
          setShowModal={setShowModal}
          handleDeleteItemFromLocalStorage={handleDeleteItemFromLocalStorage}
        >
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
