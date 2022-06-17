import classNames from 'classnames/bind';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Feedback,
  LanguageIcon,
  LogOutIcon,
  NextIcon,
  ProfileIcon,
  ThemIcon,
} from '~/components/Icons';
import Image from '~/components/Image/Image';
import Menu from '~/components/Menu';
import styles from './User.module.scss';

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

const User = ({ currentUser = {} }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <Menu data={MENU_HAS_USER} setShowMenu={setShowMenu} showMenu={showMenu}>
        <button
          className={cx('user-btn')}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Image
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className={cx('avatar')}
          />
        </button>
      </Menu>
      <a href="" className={cx('user-name')}>
        {currentUser.displayName}
      </a>
    </div>
  );
};

User.propTypes = {};

export default User;
