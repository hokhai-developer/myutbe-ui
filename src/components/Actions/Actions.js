import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import styles from './Actions.module.scss';

import Category from './Category';
import Notification from './Notification';
import Setting from './Setting/Setting';
import User from './User';

const cx = classNames.bind(styles);

const Actions = (props) => {
  const [hasUser, setHasUser] = useState(false);

  const currentUser = useSelector(userSelector);
  useEffect(() => {
    const values = Object.values(currentUser);
    if (values.length === 0) {
      setHasUser(false);
      return;
    }
    const hasValueFail = Object.values(currentUser).some((value) => {
      return value === null || value.length === 0;
    });
    if (hasValueFail) {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [currentUser]);
  return (
    <div className={cx('wrapper')}>
      {hasUser ? (
        <>
          <Category />
          <Notification />
          <User currentUser={currentUser} />
        </>
      ) : (
        <Setting />
      )}
    </div>
  );
};
Actions.propTypes = {};

export default Actions;
