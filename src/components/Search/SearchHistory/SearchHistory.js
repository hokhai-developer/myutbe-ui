import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchHistory.module.scss';
import { SearchIcon, ClearIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const SearchHistory = ({ data }) => {
  console.log(data.title);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('icon', 'search')}>
        <SearchIcon />
      </div>
      <p className={cx('title')}>{data.title}</p>
      <div className={cx('icon', 'clear')}>
        <ClearIcon />
      </div>
    </div>
  );
};

SearchHistory.propTypes = {
  data: PropTypes.object,
};

export default SearchHistory;
