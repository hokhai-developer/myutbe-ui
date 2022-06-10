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
} from '../Icons';
import Image from '../Image/Image';
import useWindowSize from '~/components/hooks/useWindowResize';
import Button from '../Button';

const cx = classNames.bind(styles);

const Actions = (props) => {
  const [hasUser, setHasUser] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const windowWidth = useWindowSize();

  useEffect(() => {
    if (windowWidth < 391) {
      setShowActions(false);
    }
  }, [windowWidth]);

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
          <button className={cx('action-btn', 'settings-btn')}>
            <SettingsIcon className={cx('icon')} />
          </button>
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
