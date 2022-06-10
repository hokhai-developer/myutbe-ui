import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);
const Image = ({
  src = '',
  alt = 'Mytube-ui',
  fallback: customFallback = images.noImage,
  className = '',
  ...props
}) => {
  const [fallback, setFallback] = useState(src);
  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <div className={cx('image', className)}>
      <img src={src || fallback} alt={alt} onError={handleError} {...props} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  customFallback: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
