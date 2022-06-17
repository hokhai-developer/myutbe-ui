import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import RegisterForm from './RegisterForm';
import SignInForm from './SignInForm';
import { ClearIcon } from '~/components/Icons';

import { useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '~/firebase/Config';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Form = () => {
  const [currentForm, setCurrentForm] = useState('register');

  const handleSigInFB = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const results = await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Lỗi đăng nhập vui lòng thử lại');
    }
  };

  const handleSigInGG = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);
    } catch {
      alert('Lỗi đăng nhập vui lòng thử lại');
    }
  };
  return (
    <div className={cx('container')}>
      {currentForm === 'signIn' && (
        <>
          <SignInForm />
          <div className={cx('bottom')}>
            <p
              className={cx('register')}
              onClick={() => setCurrentForm('register')}
            >
              Đăng ký thành viên mới
            </p>
          </div>
        </>
      )}
      {currentForm === 'register' && (
        <>
          <RegisterForm />
          <div className={cx('bottom')}>
            <p className={cx('login')} onClick={() => setCurrentForm('signIn')}>
              Đã có tài khoản đăng nhập
            </p>
          </div>
        </>
      )}
      <button className={cx('btn-clear')}>
        <ClearIcon />
      </button>
      <button className={cx('btn', 'sig-in-fb')} onClick={handleSigInFB}>
        Đăng nhập Với FaceBook
      </button>
      <button className={cx('btn', 'sig-in-gg')} onClick={handleSigInGG}>
        Đăng nhập Với Google
      </button>
    </div>
  );
};

Form.propTypes = {};

export default Form;
