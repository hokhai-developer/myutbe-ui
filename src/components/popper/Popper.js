import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
const Popper = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>;
};

Popper.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
};

export default Popper;
