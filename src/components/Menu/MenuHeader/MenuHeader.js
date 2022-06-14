import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MenuHeader.module.scss';
import { BackIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const MenuHeader = ({ className, title = '', onBack = () => {} }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('menu-header-btn')} onClick={onBack}>
        <BackIcon />
      </div>
      <h4 className={cx('menu-header-title')}>{title || 'Menu Header'}</h4>
    </div>
  );
};

MenuHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onBack: PropTypes.func,
};

export default MenuHeader;
