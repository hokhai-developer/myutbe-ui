import classNames from 'classnames/bind';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '~/components/Button';
import {
  Feedback,
  LanguageIcon,
  NextIcon,
  SettingsIcon,
  ThemIcon,
  UserIcon,
} from '~/components/Icons';
import Menu from '~/components/Menu';
import styles from './Setting.module.scss';

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

const Setting = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <Menu data={MENU_NOT_USER} setShowMenu={setShowMenu} showMenu={showMenu}>
        <button
          className={cx('settings-btn')}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <SettingsIcon className={cx('icon')} />
        </button>
      </Menu>

      <Button className={cx('btn-login')} leftIcon={<UserIcon />} to={'/login'}>
        Sign In
      </Button>
    </div>
  );
};

Setting.propTypes = {};

export default Setting;
