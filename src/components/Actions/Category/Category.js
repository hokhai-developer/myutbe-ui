import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { v4 as uuidv4 } from 'uuid';
import { CreateIcon, LiveIcon, UpVideoIcon } from '~/components/Icons';
import Menu from '~/components/Menu';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
const MENU_CATEGORY = [
  {
    iconLeft: <UpVideoIcon />,
    title: 'Movies',
    id: uuidv4(),
    to: '/movies',
    choose: null,
    action: null,
  },

  {
    iconLeft: <LiveIcon />,
    title: 'TV Series',
    id: uuidv4(),
    to: '/live',
    choose: null,
    action: null,
  },
];

const Category = (props) => {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <Menu
      data={MENU_CATEGORY}
      showMenu={showCategory}
      setShowMenu={setShowCategory}
      offset={[-10, 10]}
    >
      <Tippy delay={[0, 50]} content="Category" placement="bottom">
        <button
          className={cx('create-btn')}
          onClick={() => setShowCategory(!showCategory)}
        >
          <CreateIcon className={cx('icon')} />
        </button>
      </Tippy>
    </Menu>
  );
};

Category.propTypes = {};

export default Category;
