import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';

import { NotificationsIcon } from '~/components/Icons';
import Popper from '~/components/Popper';
import styles from './Notification.module.scss';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);
const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showNotification}
        delay={[0, 700]}
        placement="left"
        offset={[80, 0]}
        onClickOutside={() => setShowNotification(false)}
        render={(attrs) => {
          return (
            <div className={'notification'} tabIndex="-1" {...attrs}>
              <Popper className={cx('notify-popper')}>
                <div className={cx('notify-header')}>
                  <h6 className={cx('header-title')}>Notifications</h6>
                </div>
                <div className={cx('notify-body')}>
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                </div>
              </Popper>
            </div>
          );
        }}
      >
        <Tippy delay={[0, 50]} content="Notifications" placement="bottom">
          <button
            className={cx('notifications-btn')}
            onClick={() => {
              setShowNotification(!showNotification);
            }}
          >
            <NotificationsIcon className={cx('icon')} />
          </button>
        </Tippy>
      </HeadlessTippy>
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
