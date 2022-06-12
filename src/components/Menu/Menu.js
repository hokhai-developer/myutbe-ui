import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import Popper from '~/components/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);

const Menu = ({ children, data = [], onClick = () => {}, ...passProps }) => {
  const hasHeader = true;

  const renderResult = (attrs) => {
    return (
      <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
        <Popper className={cx('menu-popper')}>
          {hasHeader && (
            <div className={cx('menu-header')}>
              <MenuHeader />
            </div>
          )}
          <div className={cx('menu-body', { hasHeader: hasHeader })}>
            <MenuItem className={cx('menu-item')} item={data[0]} />
          </div>
        </Popper>
      </div>
    );
  };
  return (
    <div>
      <Tippy
        visible={passProps.showMenu}
        interactive
        delay={[0, 700]}
        onClickOutside={() => passProps.setShowMenu(false)}
        // hideOnClick={}
        placement="bottom-end"
        render={renderResult}
        // onHide={}
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
