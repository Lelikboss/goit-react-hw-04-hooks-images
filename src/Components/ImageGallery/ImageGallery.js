import React from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className="ImageGallery">{children}</ul>;
};
export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.any.isRequired,
};
