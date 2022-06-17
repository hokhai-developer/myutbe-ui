import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { ClearIcon, SearchIcon } from '~/components/Icons';
import styles from './SearchHistory.module.scss';

const cx = classNames.bind(styles);
const SearchHistory = ({
  data = {},
  setShowModal = () => {
    return;
  },
  className = '',
  ...passProps
}) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('icon', 'search')}>
        <SearchIcon />
      </div>
      <p className={cx('title')}>{data.title}</p>
      <div
        className={cx('icon', 'clear')}
        onClick={() => {
          passProps.setIdItemDeleteFromLocalStorage(data.id);
          setShowModal(true);
        }}
      >
        <ClearIcon />
      </div>
    </div>
  );
};

SearchHistory.propTypes = {
  data: PropTypes.object,
  onDeletedHistory: PropTypes.func,
  classNames: PropTypes.string,
};

export default SearchHistory;
