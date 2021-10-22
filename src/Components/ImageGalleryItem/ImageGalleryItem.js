import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ searchResults, openModal }) => {
  return (
    <>
      {searchResults.map(({ id, webformatURL, tags }) => (
        <li key={id} id={id} onClick={openModal} className="ImageGalleryItem">
          <img
            src={webformatURL}
            alt={tags}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propType = {
  searchResults: PropTypes.arrayOf({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    id: PropTypes.number,
  }),
  openModal: PropTypes.func.isRequired,
};
