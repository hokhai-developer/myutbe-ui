import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import image from '~/assets/images';
import { ToggleIcon, VoiceIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Actions from '../Actions';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header-left')}>
          <button className={cx('btn-toggle')}>
            <ToggleIcon className={cx('icon-toggle')} />
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
        <div className={cx('header-search')}>
          <Search className={cx('search')} />
          <button className={cx('voice-btn')}>
            <VoiceIcon />
          </button>
        </div>
        <div className={cx('header-actions')}>
          <Actions />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
