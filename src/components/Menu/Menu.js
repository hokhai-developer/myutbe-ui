import React, { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import Popper from '~/components/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);

const Menu = ({ children, data = [], onClick = () => {}, ...passProps }) => {
  const [menuHistory, setMenuHistory] = useState([{ data: data }]);
  const currentMenu = menuHistory[menuHistory.length - 1];

  const handleClickItemHasChildren = (children) => {
    if (!!children) {
      const newMenu = children;
      setMenuHistory((pre) => [...pre, newMenu]);
    } else {
      console.log('no Children');
    }
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
                    if (item.children) {
                      handleClickItemHasChildren(item.children);
                    } else {
                      console.log('item khong co children menu');
                    }
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
