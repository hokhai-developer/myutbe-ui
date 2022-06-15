import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ClearIcon } from '~/components/Icons';
import styles from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { auth } from 'firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const cx = classNames.bind(styles);

const Form = ({ ...passProps }) => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueFullname, setValueFullname] = useState('');
  const [valuePassWordConformmation, setValuePassWordConformmation] =
    useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [formValue, setFormValue] = useState({
    email: null,
    password: null,
    fullname: null,
    passwordConformmation: null,
  });

  useEffect(() => {
    if (passProps.currentForm === 1) {
      setErrorMessage({
        email: null,
        password: null,
        fullname: null,
        passwordConformmation: null,
      });
      setFormValue({
        email: null,
        password: null,
        fullname: null,
        passwordConformmation: null,
      });
    } else if (passProps.currentForm === 0) {
      setErrorMessage({
        email: null,
        password: null,
        signInfail: null,
      });
      setFormValue({
        email: null,
        password: null,
      });
    }
  }, [passProps.currentForm]);

  const navigate = useNavigate();

  const handleBlur = (e) => {
    const target = e.target;
    const value = target.value.trim();

    //check noEmpty, trường nào muốn bắt buộc thì thêm vào
    if (
      value.length === 0 &&
      (target.type === 'email' ||
        target.type === 'password' ||
        (target.type === 'text' && target.name === 'fullname'))
    ) {
      const newErrorMessage = {
        ...errorMessage,
        [target.name]: 'Trường này không được để trống',
      };
      setErrorMessage(newErrorMessage);
      return;
    }

    //check email : isEmail
    if (target.type === 'email') {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
      };
      const isEmail = validateEmail(value);
      if (isEmail) {
        const newData = { ...formValue, email: value };
        const newErrorMessage = { ...errorMessage, email: null };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      } else {
        const newData = { ...formValue, email: null };
        const newErrorMessage = {
          ...errorMessage,
          email: 'Trường này phải là email',
        };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      }
      return;
    }

    //check password : password.length > 6
    if (target.type === 'password' && target.name === 'password') {
      if (value.length > 6) {
        const newData = { ...formValue, password: value };
        const newErrorMessage = { ...errorMessage, password: null };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      } else {
        const newData = { ...formValue, password: null };
        const newErrorMessage = {
          ...errorMessage,
          password: 'Mật khẩu phải trên 6 ký tự',
        };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      }
      return;
    }

    //check password-Conformmation
    if (target.type === 'password' && target.name === 'passwordConformmation') {
      if (value !== valuePassword) {
        const newErrorMessage = {
          ...errorMessage,
          passwordConformmation: 'Mật khẩu nhập lại không đúng',
        };
        const newData = { ...formValue, passwordConformmation: null };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      } else {
        const newData = { ...formValue, passwordConformmation: value };
        const newErrorMessage = {
          ...errorMessage,
          passwordConformmation: null,
        };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      }
      return;
    }
    //check fullname
    if (target.type === 'text' && target.name === 'fullname') {
      if (value.length > 18) {
        const newErrorMessage = {
          ...errorMessage,
          fullname: 'Tên không được dài hơn 18 ký tự',
        };
        const newData = { ...formValue, fullname: null };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      } else {
        const newData = { ...formValue, fullname: value };
        const newErrorMessage = {
          ...errorMessage,
          fullname: null,
        };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      }
      return;
    }
  };

  // khi focus thì lọa bỏ error chó chính nó
  const handleFocus = (e) => {
    const target = e.target;
    const newErrorMessage = {
      ...errorMessage,
      [target.name]: null,
      signInfail: null,
    };
    setErrorMessage(newErrorMessage);
  };

  //khi submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValueIsFalse = Object.values(formValue).some((value) => {
      return value === null;
    });
    if (!formValueIsFalse) {
      if (passProps.currentForm === 1) {
        try {
          const create = await createUserWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password,
          );
          navigate(-1);
        } catch (error) {
          setValueEmail('');
          setErrorMessage({
            ...errorMessage,
            email: 'Email đã được đăng kí vui lòng chọn email khác',
          });
          setFormValue({ ...formValue, email: null });
        }
        return;
      } else if (passProps.currentForm === 0) {
        try {
          const signIn = await signInWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password,
          );
          navigate('/');
        } catch (error) {
          // alert(error);
          setErrorMessage({
            signInfail: 'Mật khẩu hoặc email không đúng',
            email: null,
            password: null,
          });
        }
      }
    } else {
      const keyISNull = Object.keys(formValue).filter((key) => {
        return formValue[key] === null;
      });
      let newErrorMessage = { ...errorMessage };
      if (keyISNull.length > 0) {
        keyISNull.forEach((key) => {
          console.log(keyISNull);
          if (errorMessage[key] === null) {
            newErrorMessage[key] = 'Trường này không được đẻ trống';
            if (valuePassWordConformmation.length > 0) {
              newErrorMessage.passwordConformmation =
                'Mật khẩu nhập lại không đúng';
            }
          }
        });
        setErrorMessage(newErrorMessage);
        return;
      }
    }
  };

  return (
    <>
      <form className={cx('form')} id="form-register">
        <h3 className={cx('heading')}>
          {!passProps.currentForm
            ? 'Đăng nhập thành viên'
            : 'Đăng ký thành viên Mới'}
        </h3>
        <p className={cx('desc')}>Cùng nhau giải trí tại Themovies ❤️</p>

        <div className={cx('spacer')}></div>

        {!!passProps.currentForm && (
          <div
            className={cx('form-group', {
              invalid: !!errorMessage.fullname,
            })}
          >
            <label htmlFor="fullname" className={cx('form-label')}>
              Tên đầy đủ
            </label>
            <input
              value={valueFullname}
              onChange={(e) => {
                setValueFullname(e.target.value);
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              onFocus={(e) => {
                handleFocus(e);
              }}
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Nguyễn Văn A"
              className={cx('form-control')}
            />
            <span className={cx('form-message')}>{errorMessage.fullname}</span>
          </div>
        )}
        <div
          className={cx('form-group', {
            invalid: !!errorMessage?.email,
          })}
        >
          <label htmlFor="email" className={cx('form-label')}>
            Email
          </label>
          <input
            value={valueEmail}
            onChange={(e) => {
              setValueEmail(e.target.value);
            }}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onFocus={(e) => {
              handleFocus(e);
            }}
            id="email"
            name="email"
            type="email"
            placeholder="VD: email@domain.com"
            className={cx('form-control')}
          />

          <span className={cx('form-message')}>{errorMessage?.email}</span>
        </div>

        <div
          className={cx('form-group', {
            invalid: !!errorMessage?.password,
          })}
        >
          <label htmlFor="password_Conformmation" className={cx('form-label')}>
            Nhập mật khẩu
          </label>
          <input
            value={valuePassword}
            onChange={(e) => {
              setValuePassword(e.target.value);
            }}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onFocus={(e) => {
              handleFocus(e);
            }}
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            type="password"
            className={cx('form-control')}
          />
          <span className={cx('form-message')}>{errorMessage?.password}</span>
        </div>

        {passProps.currentForm === 1 && (
          <div
            className={cx('form-group', {
              invalid: !!errorMessage.passwordConformmation,
            })}
          >
            <label
              htmlFor="password_Conformmation"
              className={cx('form-label')}
            >
              Nhập lại mật khẩu
            </label>
            <input
              value={valuePassWordConformmation}
              onChange={(e) => {
                setValuePassWordConformmation(e.target.value);
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              onFocus={(e) => {
                handleFocus(e);
              }}
              id="passwordConformmation"
              name="passwordConformmation"
              placeholder="Nhập lại mật khẩu"
              type="password"
              className={cx('form-control')}
            />
            <span className={cx('form-message')}>
              {errorMessage.passwordConformmation}
            </span>
          </div>
        )}
        <div
          className={cx('form-group', {
            invalid: !!errorMessage?.signInfail,
          })}
        >
          <span className={cx('form-message')}>{errorMessage?.signInfail}</span>
        </div>
        <button className={cx('form-submit')} onClick={handleSubmit}>
          {!passProps.currentForm ? 'Đăng Nhập' : 'Đăng ký thành viên'}
        </button>
      </form>
      <div className={cx('bottom')}>
        {!passProps.currentForm && (
          <p
            className={cx('register')}
            onClick={(e) => passProps.setCurrentForm(1)}
          >
            Đăng ký thành viên mới
          </p>
        )}
        {!!passProps.currentForm && (
          <p
            className={cx('login')}
            onClick={(e) => passProps.setCurrentForm(0)}
          >
            Đã có tài khoản đăng nhập
          </p>
        )}
      </div>
      <button className={cx('btn-clear')} onClick={() => navigate(-1)}>
        <ClearIcon />
      </button>
    </>
  );
};

Form.propTypes = {};

export default Form;
