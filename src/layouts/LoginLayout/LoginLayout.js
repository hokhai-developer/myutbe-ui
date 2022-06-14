import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './LoginLayout.module.scss';

const cx = classNames.bind(styles);
const LoginLayout = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;
