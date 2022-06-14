import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Notification.module.scss';
import Image from '../Image/Image';
import { useFormatDate } from '~/components/hooks/hooks';

const cx = classNames.bind(styles);

const NotificationItem = (props) => {
  const date = useFormatDate(1655110032087);
  return (
    <div className={cx('wrapper')}>
      <Image
        src="https://picsum.photos/200"
        alt="Mytube-ui"
        className={cx('avatar')}
      />
      <div className={cx('content')}>
        <div className={cx('top')}>
          <p className={cx('user-name')}>User Name:</p>
          <p className={cx('title-video')}>Title Video</p>
        </div>
        <i className={cx('time')}>{date}</i>
      </div>
      <Image
        src="https://picsum.photos/200"
        alt="Mytube-ui"
        className={cx('image')}
      />
    </div>
  );
};

NotificationItem.propTypes = {};

export default NotificationItem;
