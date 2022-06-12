import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Actions.module.scss';
import {
  CreateIcon,
  AppsIcon,
  NotificationsIcon,
  SettingsIcon,
  UserIcon,
  LanguageIcon,
  ThemIcon,
  Feedback,
  NextIcon,
} from '../Icons';
import Image from '../Image/Image';
import Button from '../Button';
import Menu from '../Menu';

const cx = classNames.bind(styles);
const MENU_ITEMS_NOt_USER = [
  {
    iconLeft: <LanguageIcon />,
    iconRight: <NextIcon />,
    title: 'Language',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    iconLeft: <ThemIcon />,
    iconRight: <NextIcon />,
    title: 'Appearance Theme',
    children: {
      title: 'Device Them',
      data: [
        { type: 'theme', code: '1', title: 'Dark Theme' },
        { type: 'theme', code: '2', title: 'White Theme' },
      ],
    },
  },
  {
    iconLeft: <Feedback />,
    title: 'Send Feedback',
    to: '/feedback',
  },
];

const Actions = (props) => {
  const [hasUser, setHasUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={cx('wrapper')}>
      {hasUser ? (
        <>
          <button className={cx('action-btn', 'create-btn')}>
            <CreateIcon className={cx('icon')} />
          </button>
          <button className={cx('action-btn', 'apps-btn')}>
            <AppsIcon className={cx('icon')} />
          </button>

          <button className={cx('action-btn', 'notifications-btn')}>
            <NotificationsIcon className={cx('icon')} />
          </button>
          <button className={cx('user-btn')}>
            <Image
              src="https://picsum.photos/200/300"
              alt="user-avatar"
              className={cx('avatar')}
            />
          </button>
        </>
      ) : (
        <>
          <Menu
            data={MENU_ITEMS_NOt_USER}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          >
            <button
              className={cx('action-btn', 'settings-btn', { active: showMenu })}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <SettingsIcon className={cx('icon')} />
            </button>
          </Menu>
          <Button
            className={cx('btn-login')}
            leftIcon={<UserIcon />}
            to={'/login'}
          >
            Sign In
          </Button>
        </>
      )}
    </div>
  );
};

Actions.propTypes = {};

export default Actions;
