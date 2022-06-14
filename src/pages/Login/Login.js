import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import { Form } from '~/components/Form';

const cx = classNames.bind(styles);
const Login = (props) => {
  const [currentForm, setCurrentForm] = useState(0);

  return (
    <div className={cx('wrapper')}>
      <Form setCurrentForm={setCurrentForm} currentForm={currentForm} />
    </div>
  );
};

Login.propTypes = {};

export default Login;
