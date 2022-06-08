import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <p>logo</p>
        <p>search</p>
        <p>actions</p>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
