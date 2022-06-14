import React from 'react';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper';
import NotificationItem from './NotificationItem';

const cx = classNames.bind(styles);
const Notification = ({ children, className, ...passProps }) => {
  return (
    <div>
      <HeadlessTippy
        interactive
        visible={passProps.showNotification}
        delay={[0, 700]}
        placement="left"
        offset={[80, 0]}
        onClickOutside={() => passProps.setShowNotification(false)}
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
        {children}
      </HeadlessTippy>
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
