import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);
const MenuItem = ({
  className = '',
  item = {},
  onClick = () => {},
  ...passProps
}) => {
  return (
    <div
      className={cx('wrapper', className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {item.iconLeft && <div className={cx('item-icon')}>{item.iconLeft}</div>}
      <p className={cx('item-title')}>{item.title}</p>
      {item.iconRight && (
        <div className={cx('item-icon', 'item-btn')}>{item.iconRight}</div>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
};

export default MenuItem;
