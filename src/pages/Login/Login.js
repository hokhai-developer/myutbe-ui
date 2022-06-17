import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import { Form } from '~/components/Form';

const cx = classNames.bind(styles);

const Login = (props) => {
  return (
    <div className={cx('wrapper')}>
      <Form />
    </div>
  );
};

Login.propTypes = {};

export default Login;
