import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Form.module.scss';
import {
  isEmail,
  isRequired,
  minLength,
  checkPassword,
  maxLength,
} from './formValidate';
import { auth } from '~/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userSlice from '~/redux/userSlice';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valueNotValid = Object.keys(formValue).filter((key) => {
      return formValue[key] !== null && formValue[key].length === 0; //khong bat buoc thi valu la null
    });
    if (valueNotValid.length === 0) {
      try {
        const createUser = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password,
        );
        if (createUser && createUser.user) {
          await updateProfile(auth.currentUser, {
            photoURL:
              'http://placehold.jp/3d4070/ffffff/150x150.png?text=default',
            displayName: formValue.fullName,
          })
            .then(() => {
              const displayName = formValue.fullName;
              const photoURL =
                'http://placehold.jp/3d4070/ffffff/150x150.png?text=default';
              const email = createUser.user.email;
              const uid = createUser.user.uid;
              dispatch(
                userSlice.actions.setUser({
                  photoURL,
                  email,
                  uid,
                  displayName,
                }),
              );
            })
            .catch((error) => {
              console.log(error);
            });
          navigate(-1);
        }
      } catch (error) {
        if (error && error.message) {
          setErrorMessage({
            ...errorMessage,
            email: 'T??i kho???n ???? ???????c s??? d???ng',
          });
          setFormValue({ ...formValue, email: '' });
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
        errors[key] = 'Tru??ng n??y kh??ng ???????c ????? tr???ng';
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
        <h3 className={cx('heading')}>????ng k?? th??nh vi??n</h3>
        <p className={cx('desc')}>C??ng nhau gi???i tr?? t???i Themovies ??????</p>
        <div className={cx('spacer')}></div>
        <div
          className={cx('form-group', {
            invalid: errorMessage.fullName,
          })}
        >
          <label htmlFor="fullName" className={cx('form-label')}>
            T??n ?????y ?????
          </label>
          <input
            value={fullNameValue}
            onChange={(e) => setFullNameValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Nguy???n V??n A"
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
            Nh???p m???t kh???u
          </label>
          <input
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="password"
            name="password"
            placeholder="Nh???p m???t kh???u"
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
            Nh???p l???i m???t kh???u
          </label>
          <input
            value={passwordConfirmationValue}
            onChange={(e) => setPasswordConfirmationValue(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Nh???p l???i m???t kh???u"
            type="password"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>
            {errorMessage.passwordConfirmation}
          </span>
        </div>
        <button className={cx('form-submit')} onClick={(e) => handleSubmit(e)}>
          ????ng k?? th??nh vi??n
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
