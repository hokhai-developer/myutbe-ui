import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Button = ({
  disabled = false,
  children,
  leftIcon = false,
  rightIcon = false,
  href = '',
  to = '',
  onClick,
  className,
  ...passProps
}) => {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = 'a';
    props.href = href;
  }

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  const classes = cx('wrapper', {
    [className]: className,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <button className={cx('icon')}>{leftIcon}</button>}
      <h6 className={cx('title')}>{children}</h6>
      {rightIcon && <button className={cx('icon')}>{rightIcon}</button>}
    </Comp>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
