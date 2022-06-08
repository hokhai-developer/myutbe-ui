import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from '~/components/Image';
import image from '~/assets/images';
import { ToggleIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = (props) => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header-left')}>
          <button className={cx('btn-toggle')}>
            {<ToggleIcon className={cx('icon-toggle')} />}
          </button>
          <Link to="/" className={cx('link-logo')}>
            <Image
              src={image.logo}
              alt="Logo-F8"
              className={cx('logo-image')}
            />
          </Link>
          <h4 className={cx('logo-title')}>Học Lập Trình Để Đi Làm</h4>
        </div>
        <div className={cx('header-search')}>search</div>
        <p>actions</p>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
