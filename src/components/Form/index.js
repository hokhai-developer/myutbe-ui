import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ClearIcon } from '~/components/Icons';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

const Form = ({ ...passProps }) => {
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueFullname, setValueFullname] = useState('');
  const [valuePassWordConformmation, setValuePassWordConformmation] =
    useState('');
  const [errorMessage, setErrorMessage] = useState({
    email: null,
    password: null,
    fullname: null,
    passWordConformmation: null,
  });
  const [formValue, setFormValue] = useState({
    email: null,
    password: null,
    fullname: null,
    passWordConformmation: null,
  });

  const handleBlur = (e) => {
    const target = e.target;
    const value = target.value.trim();

    //check noEmpty, trường nào muốn bắt buộc thì thêm vào đây
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
    if (target.type === 'email' && value.length > 0) {
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
    if (target.type === 'password' && value.length > 0) {
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
    if (
      target.type === 'password' &&
      target.name === 'password_Conformmation'
    ) {
      if (value !== valuePassword) {
        const newErrorMessage = {
          ...errorMessage,
          passWordConformmation: 'Mật khẩu nhập lại không đúng',
        };
        const newData = { ...formValue, passWordConformmation: null };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
        return;
      } else {
        const newData = { ...formValue, passWordConformmation: value };
        const newErrorMessage = {
          ...errorMessage,
          passWordConformmation: null,
        };
        setErrorMessage(newErrorMessage);
        setFormValue(newData);
      }
    }
  };

  // khi focus thì lọa bỏ error chó chính nó
  const handleFocus = (e) => {
    const target = e.target;
    if (target.type && target.name) {
      const newErrorMessage = { ...errorMessage, [target.name]: null };
      setErrorMessage(newErrorMessage);
    }
  };

  //khi submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValueIsFalse = Object.values(formValue).some((value) => {
      return value === null;
    });
    if (!formValueIsFalse) {
      alert('co thể submit form với formValue');
      return;
    }
    const keyISNull = Object.keys(formValue).filter((key) => {
      return formValue[key] === null;
    });
    let newErrorMessage = { ...errorMessage };
    if (keyISNull.length > 0) {
      keyISNull.forEach((key) => {
        if (errorMessage[key] === null) {
          newErrorMessage[key] = 'Trường này không được đẻ trống';
        }
      });
      setErrorMessage(newErrorMessage);
      return;
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
            invalid: !!errorMessage.email,
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

          <span className={cx('form-message')}>{errorMessage.email}</span>
        </div>

        <div
          className={cx('form-group', {
            invalid: !!errorMessage.password,
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
          <span className={cx('form-message')}>{errorMessage.password}</span>
        </div>

        {passProps.currentForm === 1 && (
          <div
            className={cx('form-group', {
              invalid: !!errorMessage.passWordConformmation,
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
              {errorMessage.passWordConformmation}
            </span>
          </div>
        )}

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
      <button className={cx('btn-clear')}>
        <ClearIcon />
      </button>
    </>
  );
};

Form.propTypes = {};

export default Form;
