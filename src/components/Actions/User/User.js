import classNames from 'classnames/bind';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Image from '~/components/Image/Image';
import Menu from '~/components/Menu';
import { MENU_HAS_USER } from '../defaultMenu';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

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

User.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default User;
