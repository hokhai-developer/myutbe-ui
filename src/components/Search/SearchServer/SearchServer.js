import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { SearchIcon } from '~/components/Icons';
import styles from './SearchServer.module.scss';

const cx = classNames.bind(styles);
const SearchResult = ({ data = {}, className }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('icon', 'search')}>
        <SearchIcon />
      </div>
      <p className={cx('content')}>{data.name}</p>
    </div>
  );
};

SearchResult.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

export default SearchResult;
