import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import { SettingsIcon, UserIcon } from '~/components/Icons';
import Menu from '~/components/Menu';
import { MENU_NOT_USER } from '../defaultMenu';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

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
