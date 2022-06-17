import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { ClearIcon } from '~/components/Icons';
import userSlice from '~/redux/userSlice';
import styles from './Form.module.scss';
import RegisterForm from './RegisterForm';
import SignInForm from './SignInForm';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '~/firebase/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Form = () => {
  const [currentForm, setCurrentForm] = useState('signIn');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSigInFB = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const results = await signInWithPopup(auth, provider);
      if (results && results.user) {
        const { displayName, email, photoURL, uid } = results.user;
        dispatch(
          userSlice.actions.setUser({ displayName, email, photoURL, uid }),
        );
      }
      navigate(-1);
    } catch (error) {
      alert('Lỗi đăng nhập vui lòng thử lại');
    }
  };

  const handleSigInGG = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const results = await signInWithPopup(auth, provider);
      if (results && results.user) {
        const { displayName, email, photoURL, uid } = results.user;
        const user = { displayName, email, photoURL, uid };
        dispatch(userSlice.actions.setUser(user));
      }
      navigate(-1);
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
      <button className={cx('btn-clear')} onClick={() => navigate(-1)}>
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
