import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import { ToggleIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Actions from '../Actions';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header-left')}>
          <button className={cx('btn-toggle')}>
            <ToggleIcon className={cx('icon-toggle')} />
          </button>
          <Link to="/" className={cx('link-logo')}>
            <Image
              src={
                'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
              }
              fallback={images.logo}
              alt="TheMovies"
              className={cx('logo-image')}
            />
          </Link>
        </div>
        <div className={cx('header-search')}>
          <Search className={cx('search')} />
        </div>
        <div className={cx('header-actions')}>
          <Actions />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
