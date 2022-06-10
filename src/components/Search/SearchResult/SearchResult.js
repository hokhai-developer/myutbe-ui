import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const SearchResult = (props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('icon', 'search')}>
        <SearchIcon />
      </div>
      <p className={cx('content')}>search result from data content</p>
    </div>
  );
};

SearchResult.propTypes = {};

export default SearchResult;
