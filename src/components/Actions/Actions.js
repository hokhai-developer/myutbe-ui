import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Actions.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
  CreateIcon,
  NotificationsIcon,
  SettingsIcon,
  UserIcon,
  LanguageIcon,
  ThemIcon,
  Feedback,
  NextIcon,
  ProfileIcon,
  LogOutIcon,
  UpVideoIcon,
  LiveIcon,
} from '../Icons';
import Image from '../Image/Image';
import Button from '../Button';
import Menu from '../Menu';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../Notification/Notification';

const cx = classNames.bind(styles);
const MENU_NOT_USER = [
  {
    iconLeft: <LanguageIcon />,
    iconRight: <NextIcon />,
    title: 'English',
    id: uuidv4(),
    children: {
      id: uuidv4(),
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
          id: uuidv4(),
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
          id: uuidv4(),
        },
      ],
    },
  },
  {
    iconLeft: <ThemIcon />,
    iconRight: <NextIcon />,
    title: 'Device Theme',
    id: uuidv4(),
    children: {
      id: uuidv4(),
      title: 'Appearance Them',
      data: [
        {
          type: 'theme',
          code: '1',
          title: 'Dark Theme',
          id: uuidv4(),
        },
        {
          type: 'theme',
          code: '2',
          title: 'White Theme',
          id: uuidv4(),
        },
      ],
    },
  },
  {
    iconLeft: <Feedback />,
    title: 'Send Feedback',
    to: '/feedback',
    id: uuidv4(),
  },
];

const MENU_HAS_USER = [
  {
    iconLeft: <ProfileIcon />,
    title: 'Your Channel',
    to: '/profile',
    id: uuidv4(),
  },
  ...MENU_NOT_USER,
  {
    iconLeft: <LogOutIcon />,
    title: 'Log Out',
    id: uuidv4(),
  },
];

const MENU_FOR_CREATE = [
  {
    iconLeft: <UpVideoIcon />,
    title: 'Movies',
    to: '/movies',
    id: uuidv4(),
  },

  {
    iconLeft: <LiveIcon />,
    title: 'TV Series',
    to: '/live',
    id: uuidv4(),
  },
];

const Actions = (props) => {
  const [hasUser, setHasUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <div className={cx('wrapper')}>
      {hasUser ? (
        <>
          <Menu
            data={MENU_FOR_CREATE}
            showMenu={showCreateMenu}
            setShowMenu={setShowCreateMenu}
            offset={[-10, 10]}
          >
            <Tippy delay={[0, 50]} content="Create" placement="bottom">
              <button
                className={cx('action-btn', 'create-btn')}
                onClick={() => setShowCreateMenu(!showCreateMenu)}
              >
                <CreateIcon className={cx('icon')} />
              </button>
            </Tippy>
          </Menu>

          <Notification
            showNotification={showNotification}
            setShowNotification={setShowNotification}
          >
            <Tippy delay={[0, 50]} content="Notifications" placement="bottom">
              <button
                className={cx('action-btn', 'notifications-btn')}
                onClick={() => {
                  setShowNotification(!showNotification);
                }}
              >
                <NotificationsIcon className={cx('icon')} />
              </button>
            </Tippy>
          </Notification>

          <div className={cx('action-user')}>
            <Menu
              data={MENU_HAS_USER}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              offset={[-10, 10]}
            >
              <button
                className={cx('user-btn')}
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <Image
                  src="https://picsum.photos/200/300"
                  alt="user-avatar"
                  className={cx('avatar')}
                />
              </button>
            </Menu>

            <a href="" className={cx('user-name')}>
              User NameUser
            </a>
          </div>
        </>
      ) : (
        <>
          <Menu
            data={MENU_NOT_USER}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          >
            <button
              className={cx('action-btn', 'settings-btn', {
                active: showMenu,
              })}
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
