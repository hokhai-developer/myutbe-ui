import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import { ClearIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
const Modal = ({ className, children, ...passProps }) => {
  return (
    <div
      className={cx('wrapper', className)}
      onClick={(e) => {
        passProps.handleDeleteItemFromLocalStorage(false);
        passProps.setShowModal(false);
      }}
    >
      <div className={cx('content')} onClick={(e) => e.stopPropagation()}>
        <div
          className={cx('content-top')}
          onClick={(e) => {
            e.stopPropagation();
            passProps.handleDeleteItemFromLocalStorage(false);
            passProps.setShowModal(false);
          }}
        >
          <ClearIcon />
        </div>
        <div className={cx('content-mid')} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
        <div className={cx('content-bottom')}>
          <button
            className={cx('btn', 'btn-yes')}
            onClick={(e) => {
              passProps.handleDeleteItemFromLocalStorage(true);
              passProps.setShowModal(false);
              e.stopPropagation();
            }}
          >
            Đồng Ý
          </button>
          <button
            className={cx('btn', 'btn-cancel')}
            onClick={(e) => {
              e.stopPropagation();
              passProps.handleDeleteItemFromLocalStorage(false);
              passProps.setShowModal(false);
            }}
          >
            Hủy Bỏ
          </button>
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
