import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { ClearIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const Modal = ({ className, children }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('content')}>
        <div className={cx('content-top')}>
          <ClearIcon />
        </div>
        <div className={cx('content-mid')}>{children}</div>
        <div className={cx('content-bottom')}>
          <button className={cx('btn', 'btn-yes')}>Đồng Ý</button>
          <button className={cx('btn', 'btn-cancel')}>Hủy Bỏ</button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;
