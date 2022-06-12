import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MenuHeader.module.scss';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const MenuHeader = ({ className, title }) => {
  return (
    <>
      <div className={cx('wrapper', className)}>
        <button className={cx('menu-header-btn')}>
          <BackIcon />
        </button>
        <h4 className={cx('menu-header-title')}>{title || 'Menu Header'}</h4>
      </div>
      <hr className={cx('bottom-hr')} />
    </>
  );
};

MenuHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default MenuHeader;
