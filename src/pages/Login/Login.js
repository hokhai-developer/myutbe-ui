import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Form } from '~/components/Form';
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '~/firebase/Config';
import AuthProvider, { AuthContext } from '~/context/AuthProvider';

const cx = classNames.bind(styles);

const Login = (props) => {
  const [currentForm, setCurrentForm] = useState(0);
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleSigInFB = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const results = await signInWithPopup(auth, provider);
      if (results) {
        const { displayName, email, photoURL, uid } = results.user;
        user.setUser({ displayName, email, photoURL, uid });
      }
    } catch (error) {
      alert('Lỗi đăng nhập vui lòng thử lại');
    }
    navigate(-1);
  };

  const handleSigInGG = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = results.user;
      user.setUser({ displayName, email, photoURL, uid });
    } catch {
      alert('Lỗi đăng nhập vui lòng thử lại');
    }
    navigate(-1);
  };

  return (
    <AuthProvider>
      <div className={cx('wrapper')}>
        <Form setCurrentForm={setCurrentForm} currentForm={currentForm} />
        <button className={cx('btn', 'sig-in-fb')} onClick={handleSigInFB}>
          Đăng nhập Với FaceBook
        </button>
        <button className={cx('btn', 'sig-in-gg')} onClick={handleSigInGG}>
          Đăng nhập Với Google
        </button>
      </div>
    </AuthProvider>
  );
};

Login.propTypes = {};

export default Login;
