import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button';
import {
  CreateIcon,
  Feedback,
  LanguageIcon,
  LiveIcon,
  LogOutIcon,
  NextIcon,
  NotificationsIcon,
  ProfileIcon,
  SettingsIcon,
  ThemIcon,
  UpVideoIcon,
  UserIcon,
} from '../Icons';
import Image from '../Image/Image';
import Menu from '../Menu';
import Notification from '../Notification/Notification';
import styles from './Actions.module.scss';

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

const MENU_CATEGORY = [
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
  const [hasUser, setHasUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  // const user = useContext(AuthContext);

  return (
    <div className={cx('wrapper')}>
      {hasUser && (
        <>
          <Menu
            data={MENU_CATEGORY}
            showMenu={showCategory}
            setShowMenu={setShowCategory}
            offset={[-10, 10]}
          >
            <Tippy delay={[0, 50]} content="Category" placement="bottom">
              <button
                className={cx('action-btn', 'create-btn')}
                onClick={() => setShowCategory(!showCategory)}
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
        </>
      )}

      <div className={cx('action-user')}>
        <Menu
          data={hasUser ? MENU_HAS_USER : MENU_NOT_USER}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          offset={hasUser ? [-10, 10] : [0]}
        >
          <button
            className={cx({
              'user-btn': hasUser,
              'action-btn': !hasUser,
              'settings-btn': !hasUser,
            })}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {hasUser ? (
              <Image src={''} alt="Themovies" className={cx('avatar')} />
            ) : (
              <SettingsIcon className={cx('icon')} />
            )}
          </button>
        </Menu>
        {hasUser ? (
          <a href="" className={cx('user-name')}>
            display name
          </a>
        ) : (
          <Button
            className={cx('btn-login')}
            leftIcon={<UserIcon />}
            to={'/login'}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};
Actions.propTypes = {};

export default Actions;
