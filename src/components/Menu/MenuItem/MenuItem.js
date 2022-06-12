import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);
const MenuItem = ({ className = '', item = {} }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('item-icon')}>{item?.iconLeft}</div>
      <p className={cx('item-title')}>{item.title}</p>
      {item.iconRight && (
        <button className={cx('item-icon', 'item-btn')}>
          {item.iconRight}
        </button>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
};

export default MenuItem;
