import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '~/context/AuthProvider';

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
          choose: true,
          to: null,
          action: null,
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
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
          choose: true,
          to: null,
          action: null,
        },
        {
          type: 'theme',
          code: '2',
          title: 'White Theme',
          id: uuidv4(),
          choose: true,
          to: null,
          action: null,
        },
      ],
    },
  },
  {
    iconLeft: <Feedback />,
    title: 'Send Feedback',
    id: uuidv4(),
    to: '/feedback',
    choose: null,
    action: null,
  },
];

const MENU_HAS_USER = [
  {
    iconLeft: <ProfileIcon />,
    title: 'Your Channel',
    id: uuidv4(),
    to: '/profile',
    choose: null,
    action: null,
  },
  ...MENU_NOT_USER,
  {
    iconLeft: <LogOutIcon />,
    title: 'Log Out',
    id: uuidv4(),
    action: 'logout',
    choose: null,
    to: null,
  },
];

const MENU_FOR_CREATE = [
  {
    iconLeft: <UpVideoIcon />,
    title: 'Movies',
    id: uuidv4(),
    to: '/movies',
    choose: null,
    action: null,
  },

  {
    iconLeft: <LiveIcon />,
    title: 'TV Series',
    id: uuidv4(),
    to: '/live',
    choose: null,
    action: null,
  },
];

const Actions = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const user = useContext(AuthContext);

  console.log(user);
  return (
    <div className={cx('wrapper')}>
      {Object.values(user.user).length !== 0 ? (
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
              setUser={user.setUser}
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
                  src={user.user.photoURL}
                  alt={user.user.displayName}
                  className={cx('avatar')}
                />
              </button>
            </Menu>

            <a href="" className={cx('user-name')}>
              {user.user.displayName}
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
