import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popper from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase/Config';

const cx = classNames.bind(styles);

const Menu = ({ children, data = [], onClick = () => {}, ...passProps }) => {
  const [menuHistory, setMenuHistory] = useState([{ data: data }]);
  const currentMenu = menuHistory[menuHistory.length - 1];
  const navigate = useNavigate();

  const handleClickItem = (item) => {
    if (!!item.children) {
      const newMenu = item.children;
      setMenuHistory((pre) => [...pre, newMenu]);
    } else {
      if (!!item.to) {
        navigate(item.to);
      } else if (!!item.choose) {
        console.log('choose');
      } else if (!!item.action) {
        if (item.action === 'logout') {
          handleLogOutUser();
        }
      }
    }
  };
  const handleLogOutUser = async () => {
    const isLogOut = await signOut(auth);
    passProps.setUser({});
    passProps.setShowMenu(false);
  };

  const onBackMenu = () => {
    menuHistory.pop();
    setMenuHistory((pre) => [...pre]);
  };

  const renderResult = (attrs) => {
    return (
      <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
        <Popper className={cx('menu-popper')}>
          {menuHistory.length > 1 && (
            <div className={cx('menu-header')}>
              <MenuHeader
                title={currentMenu.title}
                onBack={() => onBackMenu()}
              />
            </div>
          )}
          <div
            className={cx('menu-body', { hasHeader: menuHistory.length > 1 })}
          >
            {currentMenu.data.map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  className={cx('menu-item')}
                  item={item}
                  onClick={() => {
                    handleClickItem(item);
                  }}
                />
              );
            })}
          </div>
        </Popper>
      </div>
    );
  };

  return (
    <div>
      <Tippy
        interactive
        visible={passProps.showMenu}
        delay={[0, 700]}
        offset={passProps.offset ? passProps.offset : [0]}
        onClickOutside={() => passProps.setShowMenu(false)}
        placement="bottom-end"
        render={renderResult}
        onHide={() => {
          setMenuHistory((prev) => [prev[0]]);
        }}
      >
        {children}
      </Tippy>
    </div>
  );
};

Menu.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Menu;
