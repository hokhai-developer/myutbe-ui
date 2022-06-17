import classNames from 'classnames/bind';
import { useState } from 'react';
import { ClearIcon } from '~/components/Icons';
import styles from './Form.module.scss';
import {
  isEmail,
  isRequired,
  minLength,
  checkPassword,
  maxLength,
} from './formValidate';

const cx = classNames.bind(styles);
const RegisterForm = (props) => {
  const [emailValue, setEmailValue] = useState('');
  const [fullNameValue, setFullNameValue] = useState('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] =
    useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    fullName: '',
  });
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    fullName: '',
    passwordConfirmation: '',
  });

  const handleFocus = (e) => {
    const target = e.target;
    const name = target.name;
    setErrorMessage({ ...errorMessage, [name]: '' });
  };

  const handleBlur = (e) => {
    const target = e.target;
    const _isRequired = isRequired(target);
    const _isEmail = isEmail(target);
    const _minLength = minLength(target, 6);
    const _maxLength = maxLength(target, 24);
    const _isCheckPassword = checkPassword(target, formValue.password);
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
        if (target.name === 'passwordConfirmation') {
          if (_isRequired) {
            setErrorMessage({
              ...errorMessage,
              passwordConfirmation: _isRequired,
            });
            setFormValue({ ...formValue, passwordConfirmation: '' });
            return;
          }
          if (_isCheckPassword) {
            setErrorMessage({
              ...errorMessage,
              passwordConfirmation: _isCheckPassword,
            });
            setFormValue({ ...formValue, passwordConfirmation: '' });
            return;
          }
          setErrorMessage({ ...errorMessage, passwordConfirmation: '' });
          setFormValue({
            ...formValue,
            passwordConfirmation: passwordConfirmationValue.trim(),
          });
          return;
        }
        break;

      case 'text':
        if (target.name === 'fullName') {
          if (_isRequired) {
            setErrorMessage({ ...errorMessage, fullName: _isRequired });
            setFormValue({ ...formValue, fullName: '' });
            return;
          }
          if (_maxLength) {
            setErrorMessage({ ...errorMessage, fullName: _maxLength });
            setFormValue({ ...formValue, fullName: '' });
            return;
          }
          setErrorMessage({ ...errorMessage, fullName: '' });
          setFormValue({ ...formValue, fullName: fullNameValue.trim() });
          return;
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valueNotValid = Object.keys(formValue).filter((key) => {
      return formValue[key] !== null && formValue[key].length === 0; //khong bat buoc thi valu la null
    });
    if (valueNotValid.length === 0) {
      //submit form
      alert('submitform');
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
      <form className={cx('form')} id="form-register">
        <h3 className={cx('heading')}>Đăng ký thành viên</h3>
        <p className={cx('desc')}>Cùng nhau giải trí tại Themovies ❤️</p>
        <div className={cx('spacer')}></div>
        <div
          className={cx('form-group', {
            invalid: errorMessage.fullName,
          })}
        >
          <label htmlFor="fullName" className={cx('form-label')}>
            Tên đầy đủ
          </label>
          <input
            value={fullNameValue}
            onChange={(e) => setFullNameValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>{errorMessage.fullName}</span>
        </div>
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
        <div
          className={cx('form-group', {
            invalid: errorMessage.passwordConfirmation,
          })}
        >
          <label htmlFor="passwordConfirmation" className={cx('form-label')}>
            Nhập lại mật khẩu
          </label>
          <input
            value={passwordConfirmationValue}
            onChange={(e) => setPasswordConfirmationValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Nhập lại mật khẩu"
            type="password"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>
            {' '}
            {errorMessage.passwordConfirmation}
          </span>
        </div>
        <span className={cx('server-message')}></span>
        <button className={cx('form-submit')} onClick={(e) => handleSubmit(e)}>
          Đăng ký thành viên
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
