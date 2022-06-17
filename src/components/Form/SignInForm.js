import classNames from 'classnames/bind';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import styles from './Form.module.scss';
import { isEmail, isRequired, minLength } from './formValidate';
import { auth } from '~/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '~/redux/userSlice';
import { userSelector } from '~/redux/selectors';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const SignInForm = (props) => {
  const [errorMessageFromServer, setErrorMessageFromServer] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);

  const handleFocus = (e) => {
    const target = e.target;
    const name = target.name;
    setErrorMessageFromServer('');
    setErrorMessage({ ...errorMessage, [name]: '' });
  };

  const handleBlur = (e) => {
    const target = e.target;
    const _isRequired = isRequired(target);
    const _isEmail = isEmail(target);
    const _minLength = minLength(target, 6);
    switch (target.type) {
      case 'email':
        if (target.name === 'email') {
          if (_isRequired) {
            setErrorMessage({ ...errorMessage, email: _isRequired });
            setFormValue({ ...formValue, email: '' });
            return;
          }
          if (_isEmail) {
            setErrorMessage({ ...errorMessage, email: _isEmail });
            setFormValue({ ...formValue, email: '' });
            return;
          }
          setErrorMessage({ ...errorMessage, email: '' });
          setFormValue({ ...formValue, email: emailValue.trim() });
          return;
        }
        break;

      case 'password':
        if (target.name === 'password') {
          if (_isRequired) {
            setErrorMessage({ ...errorMessage, password: _isRequired });
            setFormValue({ ...formValue, password: '' });
            return;
          }
          if (_minLength) {
            setErrorMessage({ ...errorMessage, password: _minLength });
            setFormValue({ ...formValue, password: '' });
            return;
          }
          setErrorMessage({ ...errorMessage, password: '' });
          setFormValue({ ...formValue, password: passwordValue.trim() });
          return;
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valueNotValid = Object.keys(formValue).filter((key) => {
      return formValue[key] !== null && formValue[key].length === 0; //khong bat buoc thi valu la null
    });
    if (valueNotValid.length === 0) {
      try {
        const loggedInSuccessfully = await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password,
        );
        if (loggedInSuccessfully.user) {
          const { displayName, email, photoURL, uid } =
            loggedInSuccessfully.user;
          dispatch(
            userSlice.actions.setUser({ displayName, email, photoURL, uid }),
          );
        }
        navigate(-1);
      } catch (error) {
        if (error.message) {
          setErrorMessageFromServer('Tài khoản hoặc mật khẩu không đúng');
        }
      }
      return;
    }

    const keyCurrentNotValue = Object.keys(errorMessage).filter((key) => {
      return errorMessage[key] === '' && formValue[key] === '';
    });

    if (keyCurrentNotValue.length > 0) {
      keyCurrentNotValue.forEach((key) => {
        let errors = errorMessage;
        errors[key] = 'Truòng này không được để trống';
        setErrorMessage({
          ...errorMessage,
          ...errors,
        });
      });
      return;
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('form')} id="form-signIn">
        <h3 className={cx('heading')}>Đăng nhập thành viên</h3>
        <p className={cx('desc')}>Cùng nhau giải trí tại Themovies ❤️</p>
        <div className={cx('spacer')}></div>
        <div
          className={cx('form-group', {
            invalid: errorMessage.email,
          })}
        >
          <label htmlFor="email" className={cx('form-label')}>
            Email
          </label>
          <input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="email"
            name="email"
            type="email"
            placeholder="VD: email@domain.com"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>{errorMessage.email}</span>
        </div>
        <div
          className={cx('form-group', {
            invalid: errorMessage.password,
          })}
        >
          <label htmlFor="password" className={cx('form-label')}>
            Nhập mật khẩu
          </label>
          <input
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            type="password"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>{errorMessage.password}</span>
        </div>
        <span
          className={cx('sever-message', {
            displayNone: errorMessageFromServer.length === 0,
          })}
        >
          {errorMessageFromServer}
        </span>
        <button className={cx('form-submit')} onClick={(e) => handleSubmit(e)}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

SignInForm.propTypes = {};

export default SignInForm;
